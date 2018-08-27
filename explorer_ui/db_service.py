from app.models import Block, TransactionInfo, Address, AddressTx, IndexInfo
from app.utils.localconfig import JsonConfiguration
from app.utils.block_util import url_data, hex2int

jc = JsonConfiguration()
url = "http://%s:%s" % (jc.eth_ip, jc.eth_port)


def save2db():
    hex_last_block = url_data(url, "eth_blockNumber", [])['result']
    int_last_block = hex2int(hex_last_block)
    last_block_info = url_data(url, "eth_getBlockByNumber", [hex_last_block, True])['result']
    db_last_block_obj = Block.objects.last()
    number = 0
    if db_last_block_obj:
        number = db_last_block_obj.number + 1
    for i in range(number, int_last_block+1):
        print("Block -%s is saving..." % i)
        if not Block.objects.filter(number=i).exists():
            block_info = url_data(url, "eth_getBlockByNumber", [hex(i), True])['result']
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
                timestamp=hex2int(block_info['timestamp']),
                transactionsCount=len(block_info['transactions']),
                uncleCount = len(block_info['uncles'])
            )

            for tx in block_info['transactions']:
                if not TransactionInfo.objects.filter(hash=tx['hash']).exists():
                    transaction_info = url_data(url, "eth_getTransactionByHash", [tx['hash']])['result']
                    source = transaction_info['from']
                    to = transaction_info['to']
                    value = hex2int(transaction_info['value'])
                    tx = TransactionInfo.objects.create(
                             blockHash=blockHash,
                             blockNumber=i,
                             source=source,
                             to=to,
                             gas=hex2int(transaction_info['gas']),
                             gasPrice=hex2int(transaction_info['gasPrice']),
                             input=transaction_info['input'],
                             transactionIndex=hex2int(transaction_info['transactionIndex']),
                             value=value,
                             v=hex2int(transaction_info['v']),
                             nonce=hex2int(transaction_info['nonce']),
                             hash=transaction_info['hash'],
                             r=transaction_info['r'],
                             s=transaction_info['s'],
                            )

                    if not Address.objects.filter(address=source).exists():
                        src_balance = url_data(url, "eth_getBalance", [source, "latest"])['result']
                        src_addr = Address.objects.create(address=source, received=0, sent=str(value), balance=str(hex2int(src_balance)))
                    else:
                        src_addr = Address.objects.filter(address=source)[0]
                        Address.objects.update(sent=str(value+int(src_addr.sent)), balance=str(int(src_addr.balance)-value))

                    if not Address.objects.filter(address=to).exists():
                        tag_balance = url_data(url, "eth_getBalance", [to, "latest"])['result']
                        tag_addr = Address.objects.create(address=to, received=str(value), sent=0, balance=str(hex2int(tag_balance)))
                    else:
                        tag_addr = Address.objects.filter(address=to)[0]
                        Address.objects.update(received=str(value+int(tag_addr.received)), balance=str(int(tag_addr.balance)+value))

                    print(src_addr.id, src_addr.balance)
                    AddressTx.objects.create(address=src_addr, tx=tx, isSend=True)
                    AddressTx.objects.create(address=tag_addr, tx=tx, isSend=False)

    hashRate = hex2int(url_data(url, "eth_hashrate", []).get('result', '0x0'))
    difficulty = str((hex2int(last_block_info['totalDifficulty'])))
    unconfirmed = hex2int(url_data(url, "txpool_status", []).get('result', '0x0'))
    transactions = TransactionInfo.objects.all().count()
    miningEarnings = 0
    totalSupply = 0
    bestTransactionFee = 0
    IndexInfo.objects.update_or_create(id=1, defaults = {'hashRate': hashRate, 'difficulty': difficulty, 'unconfirmed': unconfirmed,
                             'transactions': transactions, 'miningEarnings': miningEarnings, 'totalSupply': totalSupply,
                             'bestTransactionFee': bestTransactionFee, 'lastBlock': int_last_block})






