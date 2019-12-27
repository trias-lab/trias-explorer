"""
local config for parse share.json vars
"""
import json

CONF_JSON = "conf/conf.json"


class JsonConfiguration:

    def __init__(self):
        with open(CONF_JSON, 'r') as conf:
            rec = conf.read()
        records = json.loads(rec)

        self.mysql_ip = records["mysql_ip"]
        self.mysql_port = records["mysql_port"]
        self.mysql_user = records["mysql_user"]
        self.mysql_password = records["mysql_password"]
        self.mysql_database = records["mysql_database"]
        self.request_interval = records["request_interval"]
        self.bdb_mongo_ip = records["bdb_mongo_ip"]
        self.bdb_mongo_port = records["bdb_mongo_port"]
