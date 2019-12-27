from pymongo import MongoClient
from utils.localconfig import JsonConfiguration
from utils.logger import logger

CONF = JsonConfiguration()


def get_latest_block_id():
    try:
        conn = MongoClient(CONF.bdb_mongo_ip, CONF.bdb_mongo_port)
        db = conn.get_database('octachain')
        doc = db.get_collection('bigchain').find_one(sort=[('_id', -1)])
        id = doc['_id']
        return id
    except Exception as e:
        logger.error(e)
        return None


def get_first_block_hash():
    try:
        conn = MongoClient(CONF.bdb_mongo_ip, CONF.bdb_mongo_port)
        db = conn.get_database('octachain')
        doc = db.get_collection('votes').find_one({"vote.is_block_valid":True}, sort=[('_id', 1)])
        if doc:
            hash = doc['vote']['voting_for_block']
            return hash
        else:
            return None
    except Exception as e:
        logger.error(e)
        return None

def get_next_block_hash(previous_block_hash):
    try:
        conn = MongoClient(CONF.bdb_mongo_ip, CONF.bdb_mongo_port)
        db = conn.get_database('octachain')
        doc = db.get_collection('votes').find_one({"vote.is_block_valid":True, "vote.previous_block":previous_block_hash}, sort=[('_id', 1)])
        if doc:
            hash = doc['vote']['voting_for_block']
            return hash
        else:
            return None
    except Exception as e:
        logger.error(e)
        return None

def get_block_with_hash(block_hash):
    try:
        conn = MongoClient(CONF.bdb_mongo_ip, CONF.bdb_mongo_port)
        db = conn.get_database('octachain')
        doc = db.get_collection('bigchain').find_one({"id":block_hash})
        return doc
    except Exception as e:
        logger.error(e)
        return None

def get_asset_with_id(asset_id):
    try:
        conn = MongoClient(CONF.bdb_mongo_ip, CONF.bdb_mongo_port)
        db = conn.get_database('octachain')
        doc = db.get_collection('assets').find_one({"id":asset_id})
        return doc
    except Exception as e:
        logger.error(e)
        return None



