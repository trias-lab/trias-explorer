import requests
import json
import time
from app.utils.localconfig import JsonConfiguration

jc = JsonConfiguration()


def url_data(url, method, eth_params, id=1, jsonrpc="2.0"):
    params = {"jsonrpc":jsonrpc,"method":method,"params":eth_params,"id":id}
    try:
        response = requests.post(url, json=params, headers={'Content-Type': 'application/json'},
                                timeout=1)
        result = json.loads(response.text)
        return result
    except:
        return {}


def stamp2datetime(stamp):
    # stamp to date
    tl = time.localtime(int(stamp))
    format_time = time.strftime("%Y-%m-%d %H:%M:%S", tl)
    return format_time


def hex2int(hex_str):
    # hex to decimal
    return int(hex_str, 16)

