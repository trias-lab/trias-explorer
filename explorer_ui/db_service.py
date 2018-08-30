import time
from app.models import Block, TransactionInfo, Address, AddressTx, IndexInfo
from app.utils.localconfig import JsonConfiguration
from app.utils.block_util import url_data, hex2int
from app.utils.logger import logger
from django.db import transaction
from django.db.models import Q

jc = JsonConfiguration()
url = "http://%s:%s" % (jc.eth_ip, jc.eth_port)


@transaction.atomic()
def save2db():
    """
    Updates data from the latest block to database
    :return:
    """
    start = int(time.time())
    try:
        hex_last_block = url_data(url, "eth_blockNumber", [])['result']
        int_last_block = hex2int(hex_last_block)
        last_block_info = url_data(url, "eth_getBlockByNumber", [hex_last_block, True])['result']
        db_last_block_obj = IndexInfo.objects.last()
        number = 0
        if db_last_block_obj:
            i = db_last_block_obj.lastBlock
            number = i + 1
            if (int_last_block - i) == 0:
                return
        for i in range(number, int_last_block+1):
            sid = transaction.savepoint()
            if (time.time() - start) > 10:
                break
            logger.info("Block -%s is saving..." % i)
            if not Block.objects.filter(number=i).exists():
                reward = 3*10**18
                block_info = url_data(url, "eth_getBlockByNumber", [hex(i), True])['result']
                btime = hex2int(block_info['timestamp'])
                if not len(block_info['transactions']):
                    # totalDifficulty = str((hex2int(last_block_info['totalDifficulty'])))
                    # unconfirmed = hex2int(url_data(url, "txpool_status", [])['result']['pending'])
                    # transactions = TransactionInfo.objects.all().count()
                    # lastBlockFees = Block.objects.last().blockReward
                    # IndexInfo.objects.update_or_create(id=1, defaults={'lastBlock': i, 'totalDifficulty': totalDifficulty,
                    #                                                    'unconfirmed': unconfirmed, 'transactions': transactions,
                    #                                                    'lastBlockFees': lastBlockFees})
                    IndexInfo.objects.update_or_create(id=1, defaults={'lastBlock': i})
                    if not Address.objects.filter(address=block_info['miner']).exists():
                        miner_balance = url_data(url, "eth_getBalance", [block_info['miner'], "latest"])['result']
                        Address.objects.create(address=block_info['miner'], received=0, sent=0,
                                               balance=str(hex2int(miner_balance)), txCount=0, time=btime)
                    # else:
                    #     Address.objects.filter(address=block_info['miner']).update(time=btime)
                    continue
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
                    timestamp=btime,
                    transactionsCount=len(block_info['transactions']),
                    uncleCount = len(block_info['uncles'])
                )

                for tx in block_info['transactions']:
                    if not TransactionInfo.objects.filter(hash=tx['hash']).exists():
                        transaction_info = url_data(url, "eth_getTransactionByHash", [tx['hash']])['result']
                        source = transaction_info['from']
                        to = transaction_info['to']
                        value = str(hex2int(transaction_info['value']))
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
                                 timestamp=btime
                                )
                        src_balance = str(hex2int(url_data(url, "eth_getBalance", [source, "latest"])['result']))
                        if not Address.objects.filter(address=source).exists():
                            src_addr = Address.objects.create(address=source, received=0, sent=str(value),
                                                              balance=src_balance, txCount=1, time=btime)
                        else:
                            src_addr = Address.objects.filter(address=source)[0]
                            sent_list = TransactionInfo.objects.filter(source=src_addr).values_list('value', flat=True)
                            sent_count = 0
                            for count in sent_list:
                                sent_count += int(count)
                            src_addr.sent = sent_count
                            src_addr.balance = src_balance
                            src_addr.txCount = TransactionInfo.objects.filter(Q(source=src_addr)|Q(to=src_addr)).count()
                            src_addr.time = btime
                            src_addr.save()
                        if to:
                            tag_balance_obj = url_data(url, "eth_getBalance", [to, "latest"])
                            if 'result' in tag_balance_obj:
                                tag_balance = str(hex2int(tag_balance_obj['result']))
                                if not Address.objects.filter(address=to).exists():
                                    tag_addr = Address.objects.create(address=to, received=str(value), sent=0,
                                                                    balance=tag_balance, txCount=1, time=btime)
                                else:
                                    tag_addr = Address.objects.filter(address=to)[0]
                                    received_list = TransactionInfo.objects.filter(to=tag_addr).values_list('value', flat=True)
                                    received_count = 0
                                    for count in received_list:
                                        received_count += int(count)
                                    tag_addr.received = received_count
                                    tag_addr.balance = tag_balance
                                    tag_addr.txCount = TransactionInfo.objects.filter(Q(source=src_addr)|Q(to=src_addr)).count()
                                    tag_addr.time = btime
                                    tag_addr.save()
                                AddressTx.objects.create(address=tag_addr, tx=tx, isSend=False)

                        AddressTx.objects.create(address=src_addr, tx=tx, isSend=True)
                a.blockReward = reward
                a.save()

        hashRate = hex2int(url_data(url, "eth_hashrate", []).get('result', '0x0'))
        totalDifficulty = str((hex2int(last_block_info['totalDifficulty'])))
        unconfirmed = url_data(url, "txpool_status", [])
        if 'result' not in unconfirmed:
            unconfirmed = 0
        else:
            unconfirmed = hex2int(unconfirmed['result']['pending'])
        transactions = TransactionInfo.objects.all().count()
        lastBlockFees = Block.objects.last()
        if lastBlockFees:
            lastBlockFees = lastBlockFees.blockReward
        else:
            lastBlockFees = 3*10**18
        addresses = Address.objects.count()
        last_tx = TransactionInfo.objects.last()
        if last_tx:
            lastTransactionFees = last_tx.gasPrice * last_tx.gasUsed
        else:
            lastTransactionFees = 0
        IndexInfo.objects.update_or_create(id=1, defaults = {'hashRate': hashRate, 'totalDifficulty': totalDifficulty, 'unconfirmed': unconfirmed,
                                 'transactions': transactions, 'lastBlockFees': lastBlockFees, 'addresses': addresses,
                                 'lastTransactionFees': lastTransactionFees, 'lastBlock': i})
    except Exception as e:
        logger.error(e)
        transaction.savepoint_rollback(sid)
        return


def task():
    while True:
        time.sleep(jc.request_interval)
        save2db()













