from app.models import Block, TransactionInfo, Address, AddressTx, IndexInfo
from app.utils.localconfig import JsonConfiguration
from app.utils.block_util import url_data, hex2int
from apscheduler.schedulers.blocking import BlockingScheduler
from app.utils.logger import logger
from django.db import transaction

jc = JsonConfiguration()
url = "http://%s:%s" % (jc.eth_ip, jc.eth_port)


# @transaction.atomic()
def save2db():
    """
    Updates data from the latest block to database
    :return:
    """
    sid = transaction.savepoint()
    # try:
    hex_last_block = url_data(url, "eth_blockNumber", [])['result']
    int_last_block = hex2int(hex_last_block)
    last_block_info = url_data(url, "eth_getBlockByNumber", [hex_last_block, True])['result']
    db_last_block_obj = IndexInfo.objects.last()
    number = 0
    if db_last_block_obj:
        number = db_last_block_obj.lastBlock + 1

    for i in range(number, int_last_block+1):
        print("Block -%s is saving..." % i)
        if not Block.objects.filter(number=i).exists():
            reward = 3*10**18
            block_info = url_data(url, "eth_getBlockByNumber", [hex(i), True])['result']
            if not len(block_info['transactions']):
                IndexInfo.objects.update_or_create(id=1, defaults={'lastBlock': i})
                continue
            time = hex2int(block_info['timestamp'])
            blockHash = block_info['hash']
            a=Block.objects.create(
                number=i,
                hash=blockHash,
                parentHash=block_info['parentHash'],
                nonce=block_info['nonce'],
                sha3Uncles=block_info['sha3Uncles'],
                logsBloom=block_info['logsBloom'],
                transactionsRoot=block_info['transactionsRoot'],
                stateRoot=block_info['stateRoot'],
                receiptsRoot=block_info['receiptsRoot'],
                miner=block_info['miner'],
                difficulty=str(hex2int(block_info['difficulty'])),
                totalDifficulty=str(hex2int(block_info['totalDifficulty'])),
                extraData=block_info['extraData'],
                size=hex2int(block_info['size']),
                gasLimit=hex2int(block_info['gasLimit']),
                gasUsed=hex2int(block_info['gasUsed']),
                timestamp=time,
                transactionsCount=len(block_info['transactions']),
                uncleCount = len(block_info['uncles'])
            )

            if not Address.objects.filter(address=block_info['miner']).exists():
                miner_balance = url_data(url, "eth_getBalance", [block_info['miner'], "latest"])['result']
                Address.objects.create(address=block_info['miner'], received=0, sent=0,
                                       balance=str(hex2int(miner_balance)), txCount=0, time=time)
            else:
                Address.objects.filter(address=block_info['miner']).update(time=time)
            for tx in block_info['transactions']:
                if not TransactionInfo.objects.filter(hash=tx['hash']).exists():
                    transaction_info = url_data(url, "eth_getTransactionByHash", [tx['hash']])['result']
                    source = transaction_info['from']
                    to = transaction_info['to']
                    value = hex2int(transaction_info['value'])
                    gasPrice = hex2int(transaction_info['gasPrice'])
                    gasUsed = hex2int(url_data(url, "eth_getTransactionReceipt", [tx['hash']])['result']['gasUsed'])
                    reward += (gasUsed * gasPrice)
                    tx = TransactionInfo.objects.create(
                             blockHash=blockHash,
                             blockNumber=i,
                             source=source,
                             to=to,
                             gas=hex2int(transaction_info['gas']),
                             gasPrice=gasPrice,
                             transactionIndex=hex2int(transaction_info['transactionIndex']),
                             value=value,
                             v=hex2int(transaction_info['v']),
                             nonce=hex2int(transaction_info['nonce']),
                             hash=transaction_info['hash'],
                             r=transaction_info['r'],
                             s=transaction_info['s'],
                             gasUsed=gasUsed,
                             timestamp=time
                            )
                    if not Address.objects.filter(address=source).exists():
                        src_balance = url_data(url, "eth_getBalance", [source, "latest"])['result']
                        src_addr = Address.objects.create(address=source, received=0, sent=str(value),
                                                          balance=str(hex2int(src_balance)), txCount=1, time=time)
                    else:
                        src_addr = Address.objects.filter(address=source)[0]
                        sent = str(value+int(src_addr.sent))
                        balance = str(int(src_addr.balance)-value)
                        count = src_addr.txCount + 1
                        src_addr.sent = sent
                        src_addr.balance = balance
                        src_addr.txCount = count
                        src_addr.time = time
                        src_addr.save()
                    if to:
                        if not Address.objects.filter(address=to).exists():
                            tag_balance = url_data(url, "eth_getBalance", [to, "latest"])['result']
                            tag_addr = Address.objects.create(address=to, received=str(value), sent=0,
                                                            balance=str(hex2int(tag_balance)), txCount=1, time=time)
                        else:
                            tag_addr = Address.objects.filter(address=to)[0]
                            received = str(value + int(tag_addr.received))
                            balance = str(int(tag_addr.balance) + value)
                            count = tag_addr.txCount + 1
                            tag_addr.received = received
                            tag_addr.balance = balance
                            tag_addr.txCount = count
                            tag_addr.time = time
                            tag_addr.save()
                        AddressTx.objects.create(address=tag_addr, tx=tx, isSend=False)

                    AddressTx.objects.create(address=src_addr, tx=tx, isSend=True)
            a.blockReward = reward
            a.save()
    hashRate = hex2int(url_data(url, "eth_hashrate", []).get('result', '0x0'))
    totalDifficulty = str((hex2int(last_block_info['totalDifficulty'])))
    unconfirmed = hex2int(url_data(url, "txpool_status", []).get('result', '0x0'))
    transactions = TransactionInfo.objects.all().count()
    lastBlockFees = Block.objects.last().blockReward
    addresses = Address.objects.count()
    last_tx = TransactionInfo.objects.last()
    lastTransactionFees = last_tx.gasPrice * last_tx.gasUsed
    IndexInfo.objects.update_or_create(id=1, defaults = {'hashRate': hashRate, 'totalDifficulty': totalDifficulty, 'unconfirmed': unconfirmed,
                             'transactions': transactions, 'lastBlockFees': lastBlockFees, 'addresses': addresses,
                             'lastTransactionFees': lastTransactionFees, 'lastBlock': int_last_block})
    # except Exception as e:
    #     logger.error(e)
    #     transaction.savepoint_rollback(sid)


def launch_services():
    """
    Use the timed task framework to accomplish the task of regularly updating the database
    :return:
    """
    sched = BlockingScheduler()
    sched.add_job(save2db, 'interval', max_instances=1, seconds=1)
    print('update database started')
    try:
        sched.start()
    except Exception as e:
        pass











