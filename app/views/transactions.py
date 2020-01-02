"""
transactions message
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


def _get_all_transactions_from_trias(request):
    """
    Transactions List
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
        total_data = TransactionInfo.objects.all().order_by('-blockNumber', '-timestamp')
        pag = Paginator(total_data, size)
        if page > pag.num_pages:
            page = 1
        data = list(
            pag.page(page).object_list.values(
                'hash',
                'source',
                'to',
                'value',
                'blockNumber',
                'blockHash',
                'tx_str',
                'type'))
        for item in data:
            number = item['blockNumber']
            item['time'] = stamp2datetime(
                Block.objects.get(number=number).timestamp)
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200,
                         "total_size": total_data.count(),
                         "page": page,
                         "total_page": pag.num_pages,
                         "return_data": data})


def _get_all_transactions_from_fabric(request):
    """
    Transactions List
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
        total_data = FabricTransactions.objects.using('fabric_postgresql').all().order_by('-blockid', '-createdt')
        pag = Paginator(total_data, size)
        if page > pag.num_pages:
            page = 1
        data = list(
            pag.page(page).object_list.values(
                'txhash',
                'blockid',
                'read_set',
                'write_set',
                'createdt'))
        for item in data:
            item['hash'] = item.pop('txhash')
            item['blockHash'] = FabricBlocks.objects.using('fabric_postgresql').get(blocknum=item['blockid']).blockhash
            item['blockNumber'] = item.pop('blockid')
            item['time'] = item.pop('createdt').strftime('%Y-%m-%d %H:%M:%S')
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
                         "total_size": total_data.count(),
                         "page": page,
                         "total_page": pag.num_pages,
                         "return_data": data})


def all_transactions(request):
    if jc.chain_server == 'fabric':
        result = _get_all_transactions_from_fabric(request)
    else:
        result = _get_all_transactions_from_trias(request)
    return result


def _get_transaction_info_from_trias(request):
    """
    Transaction Detail Info
    :param tx_hash: current transaction hash
    :return:
    """

    tx_hash = request.GET.get('tx_hash')
    if not tx_hash:
        return JsonResponse({"code": 201, "message": "Need Transaction Hash"})
    data = []
    try:
        data = list(TransactionInfo.objects.filter(hash=tx_hash).values())[0]
        number = data['blockNumber']
        block = Block.objects.get(number=number)
        data['gasLimit'] = block.gasLimit
        data['time'] = stamp2datetime(data['timestamp'])
        data['confirmations'] = Block.objects.last().number - number
    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "return_data": data})


def _get_transaction_info_from_fabric(request):
    """
    Transaction Detail Info
    :param tx_hash: current transaction hash
    :return:
    """

    tx_hash = request.GET.get('tx_hash')
    if not tx_hash:
        return JsonResponse({"code": 201, "message": "Need Transaction Hash"})
    data = []
    try:
        data = list(FabricTransactions.objects.using('fabric_postgresql').filter(txhash=tx_hash).values('blockid',
                                                                                                        'txhash',
                                                                                                        'read_set',
                                                                                                        'write_set',
                                                                                                        'createdt'))[0]
        blocknum = data['blockid']
        data['blockHash'] = FabricBlocks.objects.using('fabric_postgresql').get(blocknum=blocknum).blockhash
        data['blockNumber'] = data.pop('blockid')
        data['hash'] = data.pop('txhash')
        data['time'] = data.pop('createdt').strftime('%Y-%m-%d %H:%M:%S')
        tx_str = {
            'read_set': data.pop('read_set'),
            'write_set': data.pop('write_set')
        }
        data['tx_str'] = json.dumps(tx_str)
        data['type'] = 1
        data['confirmations'] = FabricBlocks.objects.using('fabric_postgresql').order_by('blocknum').last().blocknum - blocknum
    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "return_data": data})


def transaction_info(request):
    if jc.chain_server == 'fabric':
        result = _get_transaction_info_from_fabric(request)
    else:
        result = _get_transaction_info_from_trias(request)
    return result
