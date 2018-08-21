"""
index message
"""
import datetime
import random
from django.http import JsonResponse


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
        x = str((today - datetime.timedelta(days=i)).strftime('%-m/%-d'))
        hash_rate_growth[x] = hash_rate_growth_data[i]
        transactions_history[x] = transactions_data[i]

    data = {
                "hash_rate": 49.65,
                "difficulty": 6.39,
                "mining_earnings": 0.3936,
                "last_block": 6179925,
                "total_supply": 358183.16,
                "transactions": 8923.10,
                "transaction_fees": 0.00003,
                "tx_rate": 2.35,
                "unconfirmed_txs": 1993,
                "tansaction_celerator": 0.0003743,
                "transactions_history": transactions_history,
                "hash_rate_growth": hash_rate_growth
                }

    return JsonResponse({"code": 200, "return_data": data})


def index_latest_blocks(request):
    """
    Latest Blocks 20 Numbers
    :param request:
    :return:
    """

    data = []
    for i in range(20):
        data.append({
            "height": random.randint(1543335, 2983792),
            "size": random.randint(6666, 8555),
            "rewards": round(random.randint(10, 20) / 3, 2),
            "time": str(datetime.datetime.now() - datetime.timedelta(days=i))
        })

    return JsonResponse({"code": 200, "size": 20, "return_data": data})


def index_recent_transactions(request):
    """
    Recent Transactions 20 Numbers
    :param request:
    :return:
    """

    data = []
    for i in range(20):
        data.append({
                    "tx_hash": "a4337bc45a8fc544c03f52dc550cd6e1e87021bc896588bd79e901e2",
                    "from": "1f170bV2KrjF3LkLL54So442TqUIsk",
                    "to": "bb649c83dd1ea5c9d9dec9a18df0ffe9",
                    "time": str(datetime.datetime.now() - datetime.timedelta(days=i))
                })

    return JsonResponse({"code": 200, "size": 20, "return_data": data})


