import requests
import json
import time


def url_data(url, params):
    try:
        response = requests.get(url, params=params, headers={'Content-Type': 'application/json'},
                                timeout=1)
        result = json.loads(response.text)
        return result
    except:
        return False


def stamp_datetime(stamp):
    # stamp to date
    tl = time.localtime(int(stamp))
    format_time = time.strftime("%Y-%m-%d %H:%M:%S", tl)
    return format_time