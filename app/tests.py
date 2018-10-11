from django.test import TestCase

# Create your tests here.

class IndexTestCase(TestCase):

    fixtures = ["test_data.json"]

    def setUp(self):
        pass

    def test_base_info(self):
        rep = self.client.get("/api/index_base_info/")
        print("api/index_base_info/ response is: \n", rep.content.decode())
        # test http response status code
        self.assertEqual(rep.status_code, 200)
        # test some in response content
        self.assertContains(rep, "200")
        # test some in response content
        self.assertTrue(b"200" in rep.content)

    def test_blocks(self):
        rep = self.client.get("/api/index_latest_blocks/")
        print("api/index_latest_blocks/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def test_transactions(self):
        rep = self.client.get("/api/index_recent_transactions/")
        print("/api/index_recent_transactions/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def test_search(self):
        rep = self.client.get("/api/search/", {"key": "0xuz8xq11v0h0og83tyoq576imz2nhopcviqosfwp9wns8shrutm8m98c0a8pxwhp4"})
        print("/api/search/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def tearDown(self):
        pass


class BlockTestCase(TestCase):

    fixtures = ["test_data.json"]

    def setUp(self):
        pass

    def test_all_blocks(self):
        rep = self.client.get("/api/all_blocks/")
        print("/api/all_blocks/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def test_block_info(self):
        rep = self.client.get("/api/block_info/", {"block_hash": "0xuz8xq11v0h0og83tyoq576imz2nhopcviqosfwp9wns8shrutm8m98c0a8pxwhp4"})
        print("/api/block_info/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def test_block_transactions(self):
        rep = self.client.get("/api/block_transactions/", {"block_hash": "0xuz8xq11v0h0og83tyoq576imz2nhopcviqosfwp9wns8shrutm8m98c0a8pxwhp4"})
        print("/api/block_transactions/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def tearDown(self):
        pass


class TransactionTestCase(TestCase):

    fixtures = ["test_data.json"]

    def setUp(self):
        pass

    def test_all_transactions(self):
        rep = self.client.get("/api/all_transactions/")
        print("/api/all_transactions/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def test_transaction_info(self):
        rep = self.client.get("/api/transaction_info/", {"tx_hash": "0x3hdp5yjapawnrppofpw4wc81a4qnlk26474zy2h6pflib7mm5n4h6cvwvdp3h00d"})
        print("/api/transaction_info/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def tearDown(self):
        pass


class AddressTestCase(TestCase):

    fixtures = ["test_data.json"]

    def setUp(self):
        pass

    def test_address_info(self):
        rep = self.client.get("/api/address/", {"address": "0xasptuyd19tmj3knfge5u61iow1tpvxbqaqp4wrzr"})
        print("/api/address/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def test_address_transactions(self):
        rep = self.client.get("/api/address_transactions/", {"address": "0xasptuyd19tmj3knfge5u61iow1tpvxbqaqp4wrzr"})
        print("/api/address_transactions/ response is: \n", rep.content.decode())
        self.assertEqual(rep.status_code, 200)
        self.assertContains(rep, "200")
        self.assertTrue(b"200" in rep.content)

    def tearDown(self):
        pass

