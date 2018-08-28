"""
user address info
"""
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.db.models import Q
from app.utils.block_util import stamp2datetime
from app.models import Block, TransactionInfo, Address
from app.utils.logger import logger


def address_info(request):
    """
    Address Detail Info
    :param address: address id
    :return:
    """

    address = request.GET.get('address')
    if not address:
        return JsonResponse({"code": 201, "message": "Need Address ID"})

    try:
        data = list(Address.objects.filter(address=address).values())[0]
        data['time'] = stamp2datetime(data['time'])
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200, "return_data": data})


def address_transactions(request):
    """
    Transactions Of Address
    :param address:
    :param size:
    :param page:
    :return:
    """

    size = request.GET.get("size", 3)
    page = request.GET.get("page", 1)
    address = request.GET.get("address")

    if not address:
        return JsonResponse({"code": 201, "message": "Need Address ID"})

    try:
        size = int(size)
        page = int(page)
        if size <= 0 or page <= 0:
            size = 3
            page = 1
    except Exception as e:
        size = 3
        page = 1

    try:
        transactions = TransactionInfo.objects.filter(Q(source=address)|Q(to=address)).order_by('-blockNumber')
        pag = Paginator(transactions, size)
        if page > pag.num_pages:
            page = 1
        data = list(pag.page(page).object_list.values('hash', 'gasPrice', 'source', 'value', 'to', 'gasUsed', 'blockNumber'))
        for item in data:
            item['time'] = stamp2datetime(Block.objects.get(number=item['blockNumber']).timestamp)
            item['fees'] = item['gasPrice'] * item['gasUsed']
            item['confirmations'] = Block.objects.last().number - item['blockNumber']
    except Exception as e:
        logger.error(e)
        return JsonResponse({"code": 201, "message": "ERROR"})

    return JsonResponse({"code": 200, "total_size": len(transactions), "page": page, "total_page": pag.num_pages, "return_data": data})

