# ProjectName SDK exists test

import pytest
from npmregistry_sdk import NpmRegistrySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NpmRegistrySDK.test(None, None)
        assert testsdk is not None
