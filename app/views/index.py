"""
index message
"""
import datetime
from django.http import JsonResponse
from app.utils.block_util import stamp2datetime
from app.utils.localconfig import JsonConfiguration
from app.models import Block, TransactionInfo, IndexInfo, Address
from app.utils.logger import logger

jc = JsonConfiguration()
url = "http://%s:%s" % (jc.eth_ip, jc.eth_port)


def index_base_info(request):
    """
    Trias Blockchain BaseInfo
    :param request:
    :return:
    """

    transactions_data = [756, 695, 858, 862, 664, 965, 569, 787, 683, 743, 815, 974, 664, 806]
    hash_rate_growth_data = [3.37, 3.01, 2.24, 3.33, 1.44, 2,35, 2.13, 1.21, 2.45, 1.87, 3.44, 1.23, 2.44, 2.35]
    hash_rate_growth = {}
    transactions_history = {}

    for i in range(14):
        today = datetime.date.today()
        x = str((today - datetime.timedelta(days=i)).strftime('%m/%d'))
        hash_rate_growth[x] = hash_rate_growth_data[i]
        transactions_history[x] = transactions_data[i]

    data = {}
    try:
        index_info = list(IndexInfo.objects.all().values())
        if index_info:
            data = index_info[0]
    except Exception as e:
        logger.error(e)

    data['transactionsHistory'] = transactions_history
    data['hashRateGrowth'] = hash_rate_growth
    data['transactionCelerator'] = 0.0003743
    data['transactionRate'] = 2.35

    return JsonResponse({"code": 200, "return_data": data})


def index_latest_blocks(request):
    """
    Latest Blocks 20 Numbers
    :param request:
    :return:
    """

    data = []
    try:
        blocks = Block.objects.all().order_by('-number')[:20]
        if blocks.exists():
            data = list(blocks.values('number', 'size', 'timestamp', 'hash', 'blockReward'))
            for item in data:
                item['time'] = stamp2datetime(item['timestamp'])
    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "size": len(data), "return_data": data})


def index_recent_transactions(request):
    """
    Recent Transactions 20 Numbers
    :param request:
    :return:
    """

    data = []
    try:
        transactions = TransactionInfo.objects.all().order_by('-blockNumber')[:20]
        if transactions.exists():
            data = list(transactions.values('source', 'to', 'hash', 'blockNumber'))
            for item in data:
                block_number = item['blockNumber']
                item['time'] = stamp2datetime(Block.objects.get(number=block_number).timestamp)
    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 200, "size": 20, "return_data": data})


def serach(request):
    """
    Search From number/blockHash/txHash/address
    :param key: tags
    :return:
    """

    key = request.GET.get('key')
    if not key:
        return JsonResponse({"code": 201, "message": 'Need a key'})

    try:
        isBlock = Block.objects.filter(number=key)
        if isBlock.exists():
            return JsonResponse({"code": 200, "data_type": "block", "block_hash": isBlock[0].hash})

        isBlock = Block.objects.filter(hash=key)
        if isBlock.exists():
            return JsonResponse({"code": 200, "data_type": "block", "block_hash": key})

        isTx = TransactionInfo.objects.filter(hash=key)
        if isTx.exists():
            return JsonResponse({"code": 200, "data_type": "transaction", "tx_hash": key})

        isAddress = Address.objects.filter(address=key)
        if isAddress.exists():
            return JsonResponse({"code": 200, "data_type": "address", "address": key})
    except Exception as e:
        logger.error(e)

    return JsonResponse({"code": 201, "message": 'Error key'})
