import pymysql
from DBUtils.PooledDB import PooledDB
from utils.localconfig import JsonConfiguration
from utils.logger import logger

CONF = JsonConfiguration()


class MysqlPool(object):
    config = {
        'creator': pymysql,
        'host': CONF.mysql_ip,
        'port': CONF.mysql_port,
        'user': CONF.mysql_user,
        'password': CONF.mysql_password,
        'db': CONF.mysql_database,
        'charset': 'utf8',
        'maxconnections': 20,  # 连接池允许的最大连接数，0和None表示不限制连接数
        'cursorclass': pymysql.cursors.DictCursor
    }
    pool = PooledDB(**config)

    def __init__(self):
        self.db = MysqlPool.pool.connection()
        self.cursor = self.db.cursor()

    def query(self, sql):
        self.cursor.execute(sql)
        data = self.cursor.fetchone()
        return data

    def exec(self, sqls):
        for sql in sqls:
            self.cursor.execute(sql)
        # self.db.commit()

    def __del__(self):
        self.cursor.close()
        self.db.close()
        logger.info('Mysql conn is closed...')


# def exec_sql(sql):
#     with MysqlPool() as db:
#         try:
#             db.cursor.execute(sql)
#             db.conn.commit()
#             return True
#         except Exception as e:
#             logger.error(e)
#             db.conn.rollback()
#             return False


# if __name__ == '__main__':
#     sql_client = MysqlPool()
#     sql = "SELECT * FROM block ORDER BY id DESC LIMIT 1"
#     print(sql_client.query(sql))
