import time
import base64
import requests
import hashlib
from requests.adapters import HTTPAdapter
from utils.logger import logger
from utils.db_util import MysqlPool
from utils.localconfig import JsonConfiguration
from utils import mongo_util
import traceback
import json

CONF = JsonConfiguration()

sql_client = MysqlPool()
sleep_time = 0.03

session = requests.Session()
session.mount('http://', HTTPAdapter(max_retries=3))
session.keep_alive = True

#返回是否还有未处理的块
def save2db():
    try:
        db_last_block = sql_client.query(
            "SELECT `hash`,`number` FROM block ORDER BY id DESC LIMIT 1")
        #logger.info('last db block hash: %s' % db_last_block)

        if db_last_block:
            db_last_block_hash = db_last_block['hash']
            db_last_block_number = int(db_last_block['number'])
        else:
            db_last_block_hash = None
            db_last_block_number = None

        #要获取的块hash
        block_info = None
        if db_last_block_number:
            block_number = db_last_block_number + 1
        else:
            block_number = 1

        block_info = mongo_util.get_block_by_height(block_number)
        if not block_info:
            return False

        block_hash = block_info['id']
        logger.info('find new block, number=%s, hash=%s' % (block_number, block_hash))
        if sql_client.query(
                "SELECT COUNT(id) as block_count FROM block WHERE hash = '%s'" %
                block_hash)['block_count']:
            logger.info("Block: %s existed, should not happen" % block_hash)
            return False

        block_tx_count = len( block_info['block']['transactions'] )
        block_timestamp = block_info['block']['timestamp']
        #处理交易
        for tx in block_info['block']['transactions']:
            asset_str = ""
            if tx['operation'] == 'CREATE':
                asset_id = tx['id']
                if asset_id:
                    asset = mongo_util.get_asset_with_id(asset_id)
                    if asset:
                        #logger.info('get asset %s' % asset)
                        asset_str = json.dumps( asset['data']['data_value'] )
                        asset_str = asset_str.replace("'", "\\\'")
                        #logger.info('get asset_str %s' % asset_str)
            elif tx['operation'] == 'GENESIS':
                asset_str = "null"
            elif tx['operation'] == 'TRANSFER':
                asset_id = tx['asset']['id']
                if asset_id:
                    asset = mongo_util.get_asset_with_id(asset_id)
                    if asset:
                        # logger.info('get asset %s' % asset)
                        asset_str = json.dumps(asset['data']['data_value'])
                        asset_str = asset_str.replace("'", "\\\'")
                        # logger.info('get asset_str %s' % asset_str)
            source = tx['inputs'][0]['owners_before'][0]
            to = tx['outputs'][0]['public_keys'][0]
            sql = "INSERT INTO transaction (blockHash, timestamp, blockNumber, hash, source, `to`, `value`, `type`, tx_str) "\
                        "VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" %\
                        (block_hash, block_timestamp, block_number, tx['id'], source, to, 0, 1, asset_str)
            #logger.info('sql is %s' % sql)
            sql_client.exec([sql])

            amount = int(tx['outputs'][0]['amount'])
            balance = sql_client.query(
                    "SELECT balance FROM address WHERE address = '%s'" %
                    to)
            if balance:
                #logger.info('get balance %s' % balance)
                balance = int(balance['balance'])
                balance += amount
                sql_client.exec(["UPDATE address SET balance = '%s', time = '%s' WHERE address = '%s'"
                                 % (balance, block_timestamp, to)])
            else:
                sql_client.exec(
                    [
                        "INSERT INTO address (address, balance, time) VALUES ('%s', '%s', '%s')" %
                        (to, amount, block_timestamp)])
        #保存块信息
        sql_client.exec(
                [
                    "INSERT INTO block (number, hash, transactionsCount, timestamp, parentHash) VALUES "
                    "('%s', '%s', '%s', '%s', '%s')" %
                    (block_number, block_hash, block_tx_count, block_timestamp, db_last_block_hash)])

        sql_client.db.commit()
        return True

    except Exception as e:
        logger.error(e)
        traceback.print_exc()
        sql_client.db.rollback()
        # sql_client.__del__()
        return False

def task():
    while True:
        has_new_block = save2db()
        if has_new_block:
            time.sleep(1)
        else:
            time.sleep(1)




if __name__ == '__main__':
    task()
