"""
index message
"""
import time
import json
import datetime
from collections import OrderedDict
from django.http import JsonResponse
from django.db.models import Q
from app.models import Block, TransactionInfo, Address
from app.fabric_models import FabricBlocks, FabricTransactions
from app.utils.block_util import stamp2datetime, get_range_datetime
from app.utils.localconfig import JsonConfiguration
from app.utils.logger import logger

jc = JsonConfiguration()


def _get_index_base_info_from_trias(request):
    """
    Trias Blockchain BaseInfo
    :param request:
    """

    transactions_history = OrderedDict()
    data = {}
    try:
        # 24-hour trading rate and 7-day trading history
        transactionRate = 0
        for i in range(7):
            nowtime = time.time()
            end = int(
                time.mktime(
                    datetime.datetime.fromtimestamp(nowtime).date().timetuple()) -
                86400 *
                i +
                86400)  # i days ago timestamp
            start = int(
                time.mktime(
                    datetime.datetime.fromtimestamp(nowtime).date().timetuple()) -
                86400 *
                i +
                1)  # i+1 days ago timestamp
            x = time.strftime("%m/%d", time.localtime(start))
            tx_count = TransactionInfo.objects.filter(
                Q(timestamp__lte=end) & Q(timestamp__gte=start)).count()

            if i == 0:
                transactionRate = round(tx_count / 24, 2)
            transactions_history[x] = tx_count

        data['transactionsHistory'] = transactions_history
        data['transactionRate'] = transactionRate
        data['addresses'] = Address.objects.count()
        data['transactions'] = TransactionInfo.objects.count()
        data['lastBlock'] = Block.objects.last(
        ).number if Block.objects.exists() else 0
        data['lastBlockFees'] = 'None'
        data['lastTransactionFees'] = 'None'
        data['totalDifficulty'] = 'None'

        # The number of active addresses in the last 7 days
        addr_end = int(time.time())
        addr_satrt = int(time.time() - 86400 * 7)
        data['unconfirmed'] = Address.objects.filter(
            Q(time__lte=addr_end) & Q(time__gte=addr_satrt)).count()

        # Address balance ranking
        richList = []
        addresses = Address.objects.all().order_by('-time', '-id')
        if addresses.exists():
            richList = list(addresses.values('address', 'balance', 'time'))[:8]
            for addr in richList:
                addr['time'] = stamp2datetime(addr['time'])
        data['richList'] = richList

    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "return_data": data})


def _get_index_base_info_from_fabric(request):
    """
    Trias Blockchain BaseInfo
    :param request:
    """

    transactions_history = OrderedDict()
    data = {}
    try:
        # 24-hour trading rate and 7-day trading history
        transactionRate = 0
        datetime_range = get_range_datetime(7)
        for index in range(len(datetime_range)):
            x = datetime_range[index].strftime('%m/%d')
            if index == 0:
                tx_count = FabricTransactions.objects.using('fabric_postgresql').filter(createdt__gte=datetime_range[index]).count()
                transactionRate = round(tx_count / 24, 2)

            else:
                tx_count = FabricTransactions.objects.using('fabric_postgresql').filter(Q(createdt__gte=datetime_range[index])
                                                                             &Q(createdt__lt=datetime_range[index-1])).count()
            transactions_history[x] = tx_count

        data['transactionsHistory'] = transactions_history
        data['transactionRate'] = transactionRate
        data['addresses'] = 0
        data['transactions'] = FabricTransactions.objects.using('fabric_postgresql').count()
        lastBlock = FabricBlocks.objects.using('fabric_postgresql').order_by('blocknum').last()
        data['lastBlock'] = lastBlock.blocknum if lastBlock else 0
        data['lastBlockFees'] = 'None'
        data['lastTransactionFees'] = 'None'
        data['totalDifficulty'] = 'None'

        # The number of active addresses in the last 7 days
        addr_end = int(time.time())
        addr_satrt = int(time.time() - 86400 * 7)
        data['unconfirmed'] = Address.objects.filter(
            Q(time__lte=addr_end) & Q(time__gte=addr_satrt)).count()

        # Address balance ranking
        richList = []
        addresses = Address.objects.all().order_by('-time', '-id')
        if addresses.exists():
            richList = list(addresses.values('address', 'balance', 'time'))[:8]
            for addr in richList:
                addr['time'] = stamp2datetime(addr['time'])
        data['richList'] = richList

    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "return_data": data})


def index_base_info(request):
    if jc.chain_server == 'fabric':
        result = _get_index_base_info_from_fabric(request)
    else:
        result = _get_index_base_info_from_trias(request)
    return result


def _get_index_latest_blocks_from_trias(request):
    """
    Latest Blocks 20 Numbers
    :param request:
    :return:
    """

    data = []
    try:
        blocks = Block.objects.all().order_by('-number')[:20]
        if blocks.exists():
            data = list(
                blocks.values(
                    'number',
                    'size',
                    'timestamp',
                    'hash',
                    'blockReward',
                    'transactionsCount'))
            for item in data:
                item['time'] = stamp2datetime(item['timestamp'])
    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "size": len(data), "return_data": data})


def _get_index_latest_blocks_from_fabric(request):
    """
    Latest Blocks 20 Numbers
    :param request:
    :return:
    """

    data = []
    try:
        blocks = FabricBlocks.objects.using('fabric_postgresql').all().order_by('-blocknum')[:20]
        if blocks.exists():
            data = list(
                blocks.values(
                    'blocknum',
                    'blksize',
                    'createdt',
                    'blockhash',
                    'txcount'))
            for item in data:
                item['number'] = item.pop('blocknum')
                item['size'] = item.pop('blksize')
                item['hash'] = item.pop('blockhash')
                item['transactionsCount'] = item.pop('txcount')
                item['time'] = item.pop('createdt').strftime('%Y-%m-%d %H:%M:%S')
    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "size": len(data), "return_data": data})


def index_latest_blocks(request):
    if jc.chain_server == 'fabric':
        result = _get_index_latest_blocks_from_fabric(request)
    else:
        result = _get_index_latest_blocks_from_trias(request)
    return result


def _get_index_recent_transactions_from_trias(request):
    """
    Recent Transactions 20 Numbers
    :param request:
    :return:
    """

    data = []
    try:
        transactions = TransactionInfo.objects.all().order_by(
            '-blockNumber', '-timestamp')[:20]
        if transactions.exists():
            data = list(
                transactions.values(
                    'source',
                    'to',
                    'hash',
                    'blockNumber',
                    'timestamp',
                    'tx_str',
                    'type'))
            for item in data:
                item['time'] = stamp2datetime(item['timestamp'])
    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "size": len(data), "return_data": data})


def _get_index_recent_transactions_from_fabric(request):
    """
    Recent Transactions 20 Numbers
    :param request:
    :return:
    """

    data = []
    try:
        transactions = FabricTransactions.objects.using('fabric_postgresql').all().order_by(
            '-blockid', '-createdt')[:20]
        if transactions.exists():
            data = list(
                transactions.values(
                    'txhash',
                    'blockid',
                    'createdt',
                    'read_set',
                    'write_set'))
            for item in data:
                item['hash'] = item.pop('txhash')
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

    return JsonResponse({"code": 200, "size": len(data), "return_data": data})


def index_recent_transactions(request):
    if jc.chain_server == 'fabric':
        result = _get_index_recent_transactions_from_fabric(request)
    else:
        result = _get_index_recent_transactions_from_trias(request)
    return result


def _serach_from_trias(request):
    """
    Search From number/blockHash/txHash/address
    :param key: tags
    :return:

    """

    key = request.GET.get('key')
    if not key:
        return JsonResponse({"code": 201, "message": 'Need a key'})

    try:
        # search block by block number
        isBlock = Block.objects.filter(number=key)
        if isBlock.exists():
            return JsonResponse(
                {"code": 200, "data_type": "block", "block_hash": isBlock[0].hash})
        logger.warning("Search Block Number Error")

        # search block by block hash
        isBlock = Block.objects.filter(hash=key)
        if isBlock.exists():
            return JsonResponse(
                {"code": 200, "data_type": "block", "block_hash": key})
        logger.warning("Search Block Hash Error")

        # search transaction by tx hash
        isTx = TransactionInfo.objects.filter(hash=key)
        if isTx.exists():
            return JsonResponse(
                {"code": 200, "data_type": "transaction", "tx_hash": key})
        logger.error("Search Transaction Error")

        # search address by tx hash
        isAddress = Address.objects.filter(address=key)
        if isAddress.exists():
            return JsonResponse(
                {"code": 200, "data_type": "address", "address": key})
        logger.error("Search Address Error")

    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 201, "message": 'Error key'})


def _serach_from_fabric(request):
    """
    Search From number/blockHash/txHash/address
    :param key: tags
    :return:

    """

    key = request.GET.get('key')
    if not key:
        return JsonResponse({"code": 201, "message": 'Need a key'})

    try:
        # search block by block number
        isBlock = FabricBlocks.objects.using('fabric_postgresql').filter(blocknum=key)
        if isBlock.exists():
            return JsonResponse(
                {"code": 200, "data_type": "block", "block_hash": isBlock[0].blockhash})
        logger.warning("Search Block Number Error")
    except Exception as e:
        logger.error('Search Block number Error')

    try:
        # search block by block hash
        isBlock = FabricBlocks.objects.using('fabric_postgresql').filter(blockhash=key)
        if isBlock.exists():
            return JsonResponse(
                {"code": 200, "data_type": "block", "block_hash": key})
        logger.warning("Search Block Hash Error")

        # search transaction by tx hash
        isTx = FabricTransactions.objects.using('fabric_postgresql').filter(txhash=key)
        if isTx.exists():
            return JsonResponse(
                {"code": 200, "data_type": "transaction", "tx_hash": key})
        logger.error("Search Transaction Error")

    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 201, "message": 'Error key'})


def serach(request):
    if jc.chain_server == 'fabric':
        result = _serach_from_fabric(request)
    else:
        result = _serach_from_trias(request)
    return result
