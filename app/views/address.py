"""
user address info
"""
from django.http import JsonResponse
from django.core.paginator import Paginator


def address_info(request):
    """
    Address Detail Info
    :param address: address id
    :return:
    """

    address = request.GET.get('address')
    if not address:
        return JsonResponse({"code": 201, "message": "Need Address ID"})

    data = {
            "received": 675347.32077952,
            "sent": 675347.32077952,
            "balance": 0.0,
            "time": "2018-08-17 13:36:26",
            "address": "1PFtrRjbq4aLfM7k4tyLZ3ZAuTsgLr6Q8Q",
            "tx_count": 114138,
        }

    return JsonResponse({"code": 200, "size": 20, "return_data": data})


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

    transactions =  [
        {
            "amount_transacted": 0.44662462,
            "fees": 0.00090000,
            "fees_rate": 791,
            "time": "2018-08-17 13:36:26",
            "input": "bc1qwqdg6squsna38e46...ulcc7kytlcckxswvvzej",
            "output": "3EGxfveUFuSk346WbnCoZWVyhLEdPazry6",
            "confirmations": 3,
            "tx_hash": "0x4507a69d03d0dc145d5e7b47bc60f4796d99f594bd450749d689db6e8cebb157"
        }
    ] * 5

    pag = Paginator(transactions, size)
    if page > pag.num_pages:
        page = 1
    data = pag.page(page).object_list

    return JsonResponse({"code": 200, "size": size, "page": page, "total_page": pag.num_pages, "return_data": data})

