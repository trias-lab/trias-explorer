"""
transactions message
"""
from django.http import JsonResponse
from django.core.paginator import Paginator
from app.models import Block, TransactionInfo
from app.utils.block_util import stamp2datetime


def all_transactions(request):
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
    except Exception as e:
        size = 50
        page = 1

    total_data = [
                     {
                         "tx_hash": "0x4507a69d03d0dc145d5e7b47bc60f4796d99f594bd450749d689db6e8cebb157",
                         "block": 6179847,
                         "age": "2018-08-17 17:38:48",
                         "from": "0xe32e3232e",
                         "to": "0xe32e3232e",
                         "value": 0,
                         "tx_fee": 0.0000034
                     }
            ] * 500

    total_data = TransactionInfo.objects.all().order_by('-blockNumber')

    pag = Paginator(total_data, size)
    if page > pag.num_pages:
        page = 1
    data = list(pag.page(page).object_list.values('hash', 'source', 'to', 'value', 'blockNumber'))
    for item in data:
        number = item['blockNumber']
        item['time'] = stamp2datetime(Block.objects.get(number=number).timestamp)

    return JsonResponse({"code": 200, "total_size": total_data.count(), "page": page, "total_page": pag.num_pages, "return_data": data})


def transaction_info(request):
    """
    Transaction Detail Info
    :param tx_hash: current transaction hash
    :return:
    """

    tx_hash = request.GET.get('tx_hash')
    if not tx_hash:
        return JsonResponse({"code": 201, "message": "Need Transaction Hash"})

    data = TransactionInfo.objects.filter(hash=tx_hash).values()[0]
    number = data['blockNumber']
    block = Block.objects.get(number=number)
    data['gasLimit'] = block.gasLimit
    data['time'] = stamp2datetime(block.timestamp)
    data['confirmations'] = Block.objects.last().number - number

    return JsonResponse({"code": 200, "return_data": data})
