# NpmRegistry SDK feature factory

from npmregistry_sdk.feature.base_feature import NpmRegistryBaseFeature
from npmregistry_sdk.feature.test_feature import NpmRegistryTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NpmRegistryBaseFeature(),
        "test": lambda: NpmRegistryTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
