"""
blocks message
"""
from django.http import JsonResponse
from django.core.paginator import Paginator
from app.utils.block_util import stamp2datetime
from app.utils.localconfig import JsonConfiguration
from app.models import Block, TransactionInfo

jc = JsonConfiguration()
url = "http://%s:%s" % (jc.eth_ip, jc.eth_port)


def all_blocks(request):
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
    except Exception as e:
        size = 50
        page = 1

    total_data = Block.objects.all().order_by('-number')
    pag = Paginator(total_data, size)
    if page > pag.num_pages:
        page = 1
    data = list(pag.page(page).object_list.values('hash', 'number', 'transactionsCount', 'size', 'blockReward', 'timestamp'))
    for item in data:
        item['time'] = stamp2datetime(item['timestamp'])
        item['avgFee'] = 0.00332

    return JsonResponse({"code": 200, "total_size": total_data.count(), "page": page, "total_page": pag.num_pages, "return_data": data})


def block_info(request):
    """
    Block Detail Info
    :param block_hash: current block hash
    :return:
    """

    block_hash = request.GET.get('block_hash')
    if not block_hash:
        return JsonResponse({"code": 201, "message": "Need Block Hash"})

    block_info = Block.objects.filter(hash=block_hash).values('number', 'transactionsCount', 'timestamp', 'size',
                                                              'difficulty', 'nonce', 'parentHash', 'miner',
                                                              'gasLimit', 'gasUsed')
    block_info = list(block_info)[0]
    block_info['time'] = stamp2datetime(block_info['timestamp'])
    number = block_info['number']
    block_info['confirmations'] = Block.objects.last().number - number

    if block_info['confirmations'] > 0:
        next_block_number = number + 1
        block_info['NextBlock'] = Block.objects.get(number=next_block_number).hash
    else:
        block_info['NextBlock'] = 'N/A'

    return JsonResponse({"code": 200, "return_data": block_info})


def block_transactions(request):
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
    sort = request.GET.get("sort")

    if not block_hash:
        return JsonResponse({"code": 201, "message": "Need Block Hash"})

    try:
        size = int(size)
        page = int(page)
        if size <= 0 or page <= 0:
            size = 3
            page = 1
    except Exception as e:
        size = 3
        page = 1

    total_data = TransactionInfo.objects.filter(blockHash=block_hash).order_by('-id')

    pag = Paginator(total_data, size)
    if page > pag.num_pages:
        page = 1
    data = list(pag.page(page).object_list.values())

    return JsonResponse({"code": 200, "total_size": len(total_data), "page": page, "total_page": pag.num_pages, "return_data": data})




