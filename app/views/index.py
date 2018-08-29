"""
index message
"""
import datetime
import time
from django.http import JsonResponse
from app.utils.block_util import stamp2datetime
from app.utils.localconfig import JsonConfiguration
from app.models import Block, TransactionInfo, IndexInfo, Address
from app.utils.logger import logger
from django.db.models import Q
from collections import OrderedDict

jc = JsonConfiguration()
url = "http://%s:%s" % (jc.eth_ip, jc.eth_port)


def index_base_info(request):
    """
    Trias Blockchain BaseInfo
    :param request:
    :return:
    """

    transactions_history = OrderedDict()
    data = {}
    try:
        index_info = list(IndexInfo.objects.all().values())
        if index_info:
            data = index_info[0]

        blocksRate = 0
        transactionRate = 0
        for i in range(7):
            today = datetime.date.today()
            x = str((today - datetime.timedelta(days=i)).strftime('%m/%d'))
            end = int(time.mktime((today - datetime.timedelta(days=i)).timetuple()))  # i days ago timestamp
            start = int(time.mktime((today - datetime.timedelta(days=i + 1)).timetuple()))  # i+1 days ago timestamp
            tx_count = TransactionInfo.objects.filter(Q(timestamp__lte=end) & Q(timestamp__gte=start)).count()

            if i == 0:
                transactionRate = round(tx_count / 24, 2)
            transactions_history[x] = tx_count
        data['transactionsHistory'] = transactions_history
        data['blocksRate'] = blocksRate
        data['transactionRate'] = transactionRate

        richList = []
        addresses = Address.objects.all().order_by('-time', '-txCount', '-id')
        if addresses.exists():
            richList = list(addresses.values('address', 'balance', 'time'))[:10]
            for addr in richList:
                addr['time'] = stamp2datetime(addr['time'])
        data['richList'] = richList

    except Exception as e:
        logger.error(e)

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
    except Exception as e:
        pass

    try:
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
