"""
blocks message
"""
import json
from django.http import JsonResponse
from django.core.paginator import Paginator
from app.models import Block, TransactionInfo
from app.fabric_models import FabricBlocks, FabricTransactions
from app.utils.block_util import stamp2datetime
from app.utils.localconfig import JsonConfiguration
from app.utils.logger import logger

jc = JsonConfiguration()


def _get_all_blocks_from_trias(request):
    """
    Blocks List
    :param size: per page count
    :param page: current page
    :return:
    """

    size = request.GET.get("size", 50)
    page = request.GET.get("page", 1)

    try:
        size = int(size)
        page = int(page)
        if size <= 0 or page <= 0:
            size = 50
            page = 1
    except Exception:
        size = 50
        page = 1

    try:
        total_data = Block.objects.all().order_by('-number')
        pag = Paginator(total_data, size)
        if page > pag.num_pages:
            page = 1
        data = list(
            pag.page(page).object_list.values(
                'hash',
                'number',
                'transactionsCount',
                'size',
                'blockReward',
                'timestamp'))
        for item in data:
            item['time'] = stamp2datetime(item['timestamp'])
            item['avgFee'] = 0.00332
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200,
                         "total_size": total_data.count(),
                         "page": page,
                         "total_page": pag.num_pages,
                         "return_data": data})


def _get_all_blocks_from_fabric(request):
    """
    Blocks List
    :param size: per page count
    :param page: current page
    :return:
    """

    size = request.GET.get("size", 50)
    page = request.GET.get("page", 1)

    try:
        size = int(size)
        page = int(page)
        if size <= 0 or page <= 0:
            size = 50
            page = 1
    except Exception:
        size = 50
        page = 1

    try:
        total_data = FabricBlocks.objects.using('fabric_postgresql').all().order_by('-blocknum')
        pag = Paginator(total_data, size)
        if page > pag.num_pages:
            page = 1
        data = list(
            pag.page(page).object_list.values(
                'blockhash',
                'blocknum',
                'txcount',
                'blksize',
                'createdt'))
        for item in data:
            item['hash'] = item.pop('blockhash')
            item['number'] = item.pop('blocknum')
            item['transactionsCount'] = item.pop('txcount')
            item['size'] = item.pop('blksize')
            item['blockReward'] = None
            item['time'] = item.pop('createdt').strftime('%Y-%m-%d %H:%M:%S')
            item['avgFee'] = 0.00332
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200,
                         "total_size": total_data.count(),
                         "page": page,
                         "total_page": pag.num_pages,
                         "return_data": data})


def all_blocks(request):
    if jc.chain_server == 'fabric':
        result = _get_all_blocks_from_fabric(request)
    else:
        result = _get_all_blocks_from_trias(request)
    return result


def _get_block_info_from_trias(request):
    """
    Block Detail Info
    :param block_hash: current block hash
    :return:
    """

    block_hash = request.GET.get('block_hash')
    if not block_hash:
        return JsonResponse({"code": 201, "message": "Need Block Hash"})

    try:
        block_info = Block.objects.filter(
            hash=block_hash).values(
                'number',
                'transactionsCount',
                'timestamp',
                'size',
                'difficulty',
                'nonce',
                'parentHash',
                'miner',
                'gasLimit',
                'gasUsed',
                'blockReward')
        if not block_info.exists():
            return JsonResponse(
                {"code": 201, "message": "The block doesn't exist"})

        block_info = list(block_info)[0]
        block_info['time'] = stamp2datetime(block_info['timestamp'])
        number = block_info['number']
        block_info['confirmations'] = Block.objects.last().number - number

        if block_info['confirmations'] > 0:
            block_info['nextHash'] = Block.objects.get(number=number + 1).hash
        else:
            block_info['nextHash'] = 'N/A'
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200, "return_data": block_info})


def _get_block_info_from_fabric(request):
    """
    Block Detail Info
    :param block_hash: current block hash
    :return:
    """

    block_hash = request.GET.get('block_hash')
    if not block_hash:
        return JsonResponse({"code": 201, "message": "Need Block Hash"})

    try:
        block_info = FabricBlocks.objects.using('fabric_postgresql').filter(
            blockhash=block_hash).values('blocknum',
                                         'txcount',
                                         'createdt',
                                         'blksize',
                                         'prehash')
        if not block_info.exists():
            return JsonResponse(
                {"code": 201, "message": "The block doesn't exist"})

        block_info = list(block_info)[0]
        number = block_info['blocknum']
        block_info['number'] = block_info.pop('blocknum')
        block_info['transactionsCount'] = block_info.pop('txcount')
        block_info['size'] = block_info.pop('blksize')
        block_info['parentHash'] = block_info.pop('prehash')
        block_info['time'] = block_info.pop('createdt').strftime('%Y-%m-%d %H:%M:%S')
        block_info['confirmations'] = FabricBlocks.objects.using('fabric_postgresql').order_by(
            'blocknum').last().blocknum - number

        if block_info['confirmations'] > 0:
            block_info['nextHash'] = FabricBlocks.objects.using('fabric_postgresql').get(blocknum=number + 1).blockhash
        else:
            block_info['nextHash'] = 'N/A'
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200, "return_data": block_info})


def block_info(request):
    if jc.chain_server == 'fabric':
        result = _get_block_info_from_fabric(request)
    else:
        result = _get_block_info_from_trias(request)
    return result


def _get_block_transactions_from_trias(request):
    """
    Transactions Of Block
    :param size: per page count
    :param page: current page
    :param block_hash:
    :param sort:
    :return:
    """

    size = request.GET.get("size", 3)
    page = request.GET.get("page", 1)
    block_hash = request.GET.get("block_hash")
    sort = request.GET.get("sort", '-id')

    if not block_hash:
        return JsonResponse({"code": 201, "message": "Need Block Hash"})

    try:
        size = int(size)
        page = int(page)
        if size <= 0 or page <= 0:
            size = 3
            page = 1
    except Exception:
        size = 3
        page = 1

    try:
        total_data = TransactionInfo.objects.filter(
            blockHash=block_hash).order_by(sort)
        if total_data.count() == 0:
            return JsonResponse(
                {"code": 200, "total_size": 0, "return_data": []})
        pag = Paginator(total_data, size)
        if page > pag.num_pages:
            page = 1
        data = list(pag.page(page).object_list.values())
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200,
                         "total_size": len(total_data),
                         "page": page,
                         "total_page": pag.num_pages,
                         "return_data": data})


def _get_block_transactions_from_fabric(request):
    """
    Transactions Of Block
    :param size: per page count
    :param page: current page
    :param block_hash:
    :param sort:
    :return:
    """

    size = request.GET.get("size", 3)
    page = request.GET.get("page", 1)
    block_hash = request.GET.get("block_hash")
    sort = request.GET.get("sort", '-id')

    if not block_hash:
        return JsonResponse({"code": 201, "message": "Need Block Hash"})

    try:
        size = int(size)
        page = int(page)
        if size <= 0 or page <= 0:
            size = 3
            page = 1
    except Exception:
        size = 3
        page = 1

    try:
        block_num = FabricBlocks.objects.using('fabric_postgresql').get(blockhash=block_hash).blocknum
        total_data = FabricTransactions.objects.using('fabric_postgresql').filter(
            blockid=block_num).order_by(sort)
        if total_data.count() == 0:
            return JsonResponse(
                {"code": 200, "total_size": 0, "return_data": []})
        pag = Paginator(total_data, size)
        if page > pag.num_pages:
            page = 1
        data = list(pag.page(page).object_list.values('blockid', 'txhash', 'createdt', 'read_set', 'write_set'))

        for item in data:
            item['blockHash'] = block_hash
            item['blockNumber'] = item.pop('blockid')
            item['hash'] = item.pop('txhash')
            item['timestamp'] = int(item.pop('createdt').timestamp())
            tx_str = {
                'read_set': item.pop('read_set'),
                'write_set': item.pop('write_set')
            }
            item['tx_str'] = json.dumps(tx_str)
            item['type'] = 1
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200,
                         "total_size": len(total_data),
                         "page": page,
                         "total_page": pag.num_pages,
                         "return_data": data})


def block_transactions(request):
    if jc.chain_server == 'fabric':
        result = _get_block_transactions_from_fabric(request)
    else:
        result = _get_block_transactions_from_trias(request)
    return result
