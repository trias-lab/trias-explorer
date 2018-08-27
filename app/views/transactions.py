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

    data = {
            "amount_transacted": "0.44662462 BTC",
            "fees": "0.00090000 BTC",
            "fees_rate": "791 Satoshis/vByte",
            "time": "2 month ago",
            "confirmations": 3,
            "tx_hash": "0x4507a69d03d0dc145d5e7b47bc60f4796d99f594bd450749d689db6e8cebb157",
            "tx_receipt_status": "success",
            "block_height": "6179213 (2 block confirmations)",
            "time_stamp": "36 secs ago (Aug-20-2018 03:34:06 AM +UTC)",
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
            "input_data": "Function: settleBet(uint256 reveal, uint256 cleanCommit)\nMethodID: 0x0d2cbe13\n"
                          "[0]:  26c8ff512382c8cbc67bf442ba822d0ee213b6e04502a4cecaf7d249e6b76a29\n"
                          "[1]:  0000000000000000000000000000000000000000000000000000000000000000",
            "receipt": [
                {
                    "address": "0xd1ceeeefa68a6af0a5f6046132d986066c7f9426",
                    "name": "Payment (index_topic_1 address beneficiary, uint256 amount)",
                    "topics": [
                        "0xd4f43975feb89f48dd30cabbb32011045be187d1e11c8ea9faa43efc35282519",
                        "0x000000000000000000000000586b72ede8fb92daf3fee026dca0f11a437f9b7d"
                    ],
                    "data": "00000000000000000000000000000000000000000000000001999b639f0b8787"
                },
                {
                    "address": "0xd1ceeeefa68a6af0a5f6046132d986066c7f9426",
                    "name": "Payment (index_topic_1 address beneficiary, uint256 amount)",
                    "topics": [
                        "0xd4f43975feb89f48dd30cabbb32011045be187d1e11c8ea9faa43efc35282519",
                        "0x000000000000000000000000586b72ede8fb92daf3fee026dca0f11a437f9b7d"
                    ],
                    "data": "00000000000000000000000000000000000000000000000001999b639f0b8787"
                }
            ]
        }

    return JsonResponse({"code": 200, "return_data": data})
