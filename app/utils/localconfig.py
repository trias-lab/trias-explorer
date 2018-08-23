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

        self.ip = records["ip"]
        self.port = records["port"]
