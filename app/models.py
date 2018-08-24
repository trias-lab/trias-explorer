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
    difficulty = models.BigIntegerField()
    totalDifficulty = models.BigIntegerField()
    extraData = models.BinaryField()
    size = models.BigIntegerField()
    gasLimit = models.BigIntegerField()
    gasUsed = models.BigIntegerField()
    timestamp = models.BigIntegerField()
    transactionsCount = models.BigIntegerField()
    uncleCount = models.BigIntegerField()
    blockReward = models.BigIntegerField()

    class Meta:
        db_table = "block"
