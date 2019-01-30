from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Block(models.Model):
    number = models.BigIntegerField(unique=True)
    hash = models.CharField(max_length=255, unique=True)
    parentHash = models.CharField(max_length=255, unique=True)
    nonce = models.CharField(max_length=255, default='')
    sha3Uncles = models.CharField(max_length=255, default='')
    logsBloom = models.CharField(max_length=1000, default='')
    transactionsRoot = models.CharField(max_length=255, default='')
    stateRoot = models.CharField(max_length=255, default='')
    receiptsRoot = models.CharField(max_length=255, default='')
    miner = models.CharField(max_length=255, default='')
    difficulty = models.CharField(max_length=255, default='')
    totalDifficulty = models.CharField(max_length=255, default='')
    extraData = models.CharField(max_length=1000)
    size = models.BigIntegerField(default=0)
    gasLimit = models.BigIntegerField(default=0)
    gasUsed = models.BigIntegerField(default=0)
    timestamp = models.BigIntegerField(default=0)
    transactionsCount = models.BigIntegerField(default=0)
    uncleCount = models.BigIntegerField(default=0)
    blockReward = models.BigIntegerField(default=0)

    class Meta:
        db_table = "block"


class IndexInfo(models.Model):
    hashRate = models.BigIntegerField(default=0)
    totalDifficulty = models.CharField(max_length=1000, default='')
    lastBlockFees = models.BigIntegerField(default=0)
    lastBlock = models.BigIntegerField(default=0)
    addresses = models.BigIntegerField(default=0)
    transactions = models.BigIntegerField(default=0)
    lastTransactionFees = models.BigIntegerField(default=0)
    unconfirmed = models.BigIntegerField(default=0)
    timestamp = models.BigIntegerField(default=0)

    class Meta:
        db_table = "info"


class TransactionInfo(models.Model):
    blockHash = models.CharField(max_length=255)
    blockNumber = models.BigIntegerField()
    source = models.CharField(max_length=255)
    to = models.CharField(max_length=255)
    gas = models.BigIntegerField(default=0)
    gasPrice = models.BigIntegerField(default=0)
    nonce = models.BigIntegerField(default=0)
    hash = models.CharField(max_length=255, unique=True)
    transactionIndex = models.BigIntegerField(default=0)
    value = models.CharField(max_length=255)
    v = models.BigIntegerField(default=0)
    r = models.CharField(max_length=255, default='')
    s = models.CharField(max_length=255, default='')
    gasUsed = models.BigIntegerField(default=0)
    timestamp = models.BigIntegerField(default=0)

    class Meta:
        db_table = "transaction"


class Address(models.Model):
    address = models.CharField(max_length=255, unique=True)
    received = models.CharField(max_length=255, default='')
    sent = models.CharField(max_length=255, default='')
    balance = models.BigIntegerField(default=0)
    time = models.BigIntegerField(default=0)
    txCount = models.BigIntegerField(default=0)

    class Meta:
        db_table = "address"


class AddressTx(models.Model):
    address = models.ForeignKey("Address")
    tx = models.ForeignKey("TransactionInfo")
    isSend = models.BooleanField()

    class Meta:
        db_table = "address_tx"
