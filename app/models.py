from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Block(models.Model):
    number = models.BigIntegerField(unique=True)
    hash = models.CharField(max_length=255, unique=True)
    parentHash = models.CharField(max_length=255, unique=True)
    nonce = models.CharField(max_length=255)
    sha3Uncles = models.CharField(max_length=255)
    logsBloom = models.CharField(max_length=1000)
    transactionsRoot = models.CharField(max_length=255)
    stateRoot = models.CharField(max_length=255)
    receiptsRoot = models.CharField(max_length=255)
    miner = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=255)
    totalDifficulty = models.CharField(max_length=255)
    extraData = models.CharField(max_length=1000)
    size = models.BigIntegerField()
    gasLimit = models.BigIntegerField()
    gasUsed = models.BigIntegerField()
    timestamp = models.BigIntegerField()
    transactionsCount = models.BigIntegerField()
    uncleCount = models.BigIntegerField()
    blockReward = models.BigIntegerField(default=None)

    class Meta:
        db_table = "block"


class IndexInfo(models.Model):
    hashRate = models.BigIntegerField()
    difficulty = models.CharField(max_length=255)
    miningEarnings = models.BigIntegerField()
    lastBlock = models.BigIntegerField()
    totalSupply = models.BigIntegerField()
    transactions = models.BigIntegerField()
    bestTransactionFee = models.BigIntegerField()
    unconfirmed = models.BigIntegerField()

    class Meta:
        db_table = "info"


class TransactionInfo(models.Model):
    blockHash = models.CharField(max_length=255)
    blockNumber = models.BigIntegerField()
    source = models.CharField(max_length=255)
    to = models.CharField(max_length=255)
    gas = models.BigIntegerField()
    gasPrice = models.BigIntegerField()
    nonce = models.BigIntegerField()
    hash = models.CharField(max_length=255, unique=True)
    input = models.CharField(max_length=1000)
    transactionIndex = models.BigIntegerField()
    value = models.BigIntegerField()
    v = models.BigIntegerField()
    r = models.CharField(max_length=255)
    s = models.CharField(max_length=255)

    class Meta:
        db_table = "transaction"


class Address(models.Model):
    address = models.CharField(max_length=255, unique=True)
    received = models.CharField(max_length=255)
    sent = models.CharField(max_length=255)
    balance = models.CharField(max_length=255)
    time = models.BigIntegerField(null=True)
    txCount = models.BigIntegerField()

    class Meta:
        db_table = "address"


class AddressTx(models.Model):
    address = models.ForeignKey("Address")
    tx = models.ForeignKey("TransactionInfo")
    isSend = models.BooleanField()

    class Meta:
        db_table = "address_tx"
