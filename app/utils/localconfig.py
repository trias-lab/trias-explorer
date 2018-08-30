"""
local config for parse share.json vars
"""
import json

from explorer_ui.settings import CONF_JSON


class JsonConfiguration:

    def __init__(self):
        with open(CONF_JSON, 'r') as conf:
            rec = conf.read()
        records = json.loads(rec)

        self.eth_ip = records["eth_ip"]
        self.eth_port = records["eth_port"]
        self.mysql_ip = records["mysql_ip"]
        self.mysql_port = records["mysql_port"]
        self.request_interval = records["request_interval"]
