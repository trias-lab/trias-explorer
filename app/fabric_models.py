# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Channel(models.Model):
    name = models.CharField(max_length=64, blank=True, null=True)
    blocks = models.IntegerField(blank=True, null=True)
    trans = models.IntegerField(blank=True, null=True)
    createdt = models.DateTimeField(blank=True, null=True)
    channel_genesis_hash = models.CharField(max_length=256, blank=True, null=True)
    channel_hash = models.CharField(max_length=256, blank=True, null=True)
    channel_config = models.BinaryField(blank=True, null=True)
    channel_block = models.BinaryField(blank=True, null=True)
    channel_tx = models.BinaryField(blank=True, null=True)
    channel_version = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'channel'
        app_label = "fabric"


class FabricBlocks(models.Model):
    blocknum = models.IntegerField(blank=True, null=True)
    datahash = models.CharField(max_length=256, blank=True, null=True)
    prehash = models.CharField(max_length=256, blank=True, null=True)
    txcount = models.IntegerField(blank=True, null=True)
    createdt = models.DateTimeField(blank=True, null=True)
    prev_blockhash = models.CharField(max_length=256, blank=True, null=True)
    blockhash = models.CharField(max_length=256, blank=True, null=True)
    channel_genesis_hash = models.CharField(max_length=256, blank=True, null=True)
    blksize = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'blocks'
        app_label = "fabric"


class Chaincodes(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    version = models.CharField(max_length=255, blank=True, null=True)
    path = models.CharField(max_length=255, blank=True, null=True)
    channel_genesis_hash = models.CharField(max_length=256, blank=True, null=True)
    txcount = models.IntegerField(blank=True, null=True)
    createdt = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'chaincodes'
        app_label = "fabric"


class Orderer(models.Model):
    requests = models.CharField(max_length=64, blank=True, null=True)
    server_hostname = models.CharField(max_length=64, blank=True, null=True)
    createdt = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orderer'
        app_label = "fabric"


class Peer(models.Model):
    org = models.IntegerField(blank=True, null=True)
    channel_genesis_hash = models.CharField(max_length=256, blank=True, null=True)
    mspid = models.CharField(max_length=64, blank=True, null=True)
    requests = models.CharField(max_length=64, blank=True, null=True)
    events = models.CharField(max_length=64, blank=True, null=True)
    server_hostname = models.CharField(max_length=64, blank=True, null=True)
    createdt = models.DateTimeField(blank=True, null=True)
    peer_type = models.CharField(max_length=64, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'peer'
        app_label = "fabric"


class PeerRefChaincode(models.Model):
    peerid = models.CharField(max_length=64, blank=True, null=True)
    chaincodeid = models.CharField(max_length=64, blank=True, null=True)
    cc_version = models.CharField(max_length=64, blank=True, null=True)
    channelid = models.CharField(max_length=256, blank=True, null=True)
    createdt = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'peer_ref_chaincode'
        app_label = "fabric"


class PeerRefChannel(models.Model):
    createdt = models.DateTimeField(blank=True, null=True)
    peerid = models.CharField(max_length=64, blank=True, null=True)
    channelid = models.CharField(max_length=256, blank=True, null=True)
    peer_type = models.CharField(max_length=64, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'peer_ref_channel'
        app_label = "fabric"


class FabricTransactions(models.Model):
    blockid = models.IntegerField(blank=True, null=True)
    txhash = models.CharField(max_length=256, blank=True, null=True)
    createdt = models.DateTimeField(blank=True, null=True)
    chaincodename = models.CharField(max_length=255, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    creator_msp_id = models.CharField(max_length=128, blank=True, null=True)
    endorser_msp_id = models.CharField(max_length=800, blank=True, null=True)
    chaincode_id = models.CharField(max_length=256, blank=True, null=True)
    type = models.CharField(max_length=128, blank=True, null=True)
    read_set = models.TextField(blank=True, null=True)  # This field type is a guess.
    write_set = models.TextField(blank=True, null=True)  # This field type is a guess.
    channel_genesis_hash = models.CharField(max_length=256, blank=True, null=True)
    validation_code = models.CharField(max_length=50, blank=True, null=True)
    envelope_signature = models.CharField(max_length=256, blank=True, null=True)
    payload_extension = models.CharField(max_length=256, blank=True, null=True)
    creator_id_bytes = models.CharField(max_length=256, blank=True, null=True)
    creator_nonce = models.CharField(max_length=256, blank=True, null=True)
    chaincode_proposal_input = models.CharField(max_length=256, blank=True, null=True)
    tx_response = models.CharField(max_length=256, blank=True, null=True)
    payload_proposal_hash = models.CharField(max_length=256, blank=True, null=True)
    endorser_id_bytes = models.CharField(max_length=256, blank=True, null=True)
    endorser_signature = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transactions'
        app_label = "fabric"


class WriteLock(models.Model):
    write_lock = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'write_lock'
        app_label = "fabric"
