"""
blocks message
"""
from django.http import JsonResponse
from django.core.paginator import Paginator
from app.utils.block_util import url_data, stamp2datetime, hex2int
from app.utils.localconfig import JsonConfiguration

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

    last_block = url_data(url, "eth_blockNumber", [])['result']
    last_block_info = url_data(url, "eth_getBlockByNumber", [last_block, True])['result']

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
                    "block_hash": last_block_info['hash'],
                    "height": hex2int(last_block),
                    "tx_count": 8493,
                    "size": 129322,
                    "avg_fee_per_tx": 0.000000332,
                    "time": "2018-08-17 17:38:48",
                    "reward": 12.5
                }
            ] * (hex2int(last_block)+1)

    pag = Paginator(total_data, size)
    if page > pag.num_pages:
        page = 1
    data = pag.page(page).object_list

    return JsonResponse({"code": 200, "total_size": hex2int(last_block)+1, "page": page, "total_page": pag.num_pages, "return_data": data})


def block_info(request):
    """
    Block Detail Info
    :param block_hash: current block hash
    :return:
    """

    block_hash = request.GET.get('block_hash')
    if not block_hash:
        return JsonResponse({"code": 201, "message": "Need Block Hash"})

    block_info = url_data(url, "eth_getBlockByHash", [block_hash, True]).get('result')

    data = {
                "height": hex2int(block_info['number']),
                "transactions": len(block_info['transactions']),
                "total_fees": 2891.89,
                "time": stamp2datetime(hex2int(block_info['timestamp'])),
                "confirmations": 2,
                "size": hex2int(block_info['size']),
                "stripped_size": 642968,
                "weight": 2720890,
                "tx_count": len(block_info['transactions']),
                "version": "0x200000000",
                "difficulty": hex2int(block_info['difficulty']),
                "bits": "0x33e3e3e3e3",
                "nonce": block_info['nonce'],
                "relayed_by": 2720890,
                "block_hash": block_hash,
                "prev_block": block_info['parentHash'],
                "next_block": "N/A",
                "merkle_root": "c58c42f0040b575dfb56ae7be218b14ea606a2d7fa6edf7814df791320e11602"
                }

    return JsonResponse({"code": 200, "return_data": data})


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

    total_data = [
                     {
                         "amount_transacted": "0.44662462 BTC",
                         "fees": "0.00090000 BTC",
                         "fees_rate": "791 Satoshis/vByte",
                         "confirmations": 3,
                         "tx_hash": "0x4507a69d03d0dc145d5e7b47bc60f4796d99f594bd450749d689db6e8cebb157",
                         "tx_receipt_status": "success",
                         "block_height": "6179213 (2 block confirmations)",
                         "time": "2018-08-17 17:38:48",
                         "value": "0 Ether ($0.00)",
                         "actual_tx_cost": "0.000189756 Ether ($0.06)",
                         "nonce": 78005,
                         "position": 12,
                         "gas_limit": 55000,
                         "gas_used": 31626,
                         "gas_price": "0.000000006 Ether (6 Gwei)",
                         "input": "bc1qwqdg6squsna38e46...ulcc7kytlcckxswvvzej",
                         "output": "3EGxfveUFuSk346WbnCoZWVyhLEdPazry6",
                         "fee": "0.06827334 BTC",
                     }
            ] * 17

    pag = Paginator(total_data, size)
    if page > pag.num_pages:
        page = 1
    data = pag.page(page).object_list

    return JsonResponse({"code": 200, "total_size": len(total_data), "page": page, "total_page": pag.num_pages, "return_data": data})




