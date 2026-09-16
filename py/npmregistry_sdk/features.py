# NpmRegistry SDK feature factory

from npmregistry_sdk.feature.base_feature import NpmRegistryBaseFeature
from npmregistry_sdk.feature.ratelimit_feature import NpmRegistryRatelimitFeature
from npmregistry_sdk.feature.retry_feature import NpmRegistryRetryFeature
from npmregistry_sdk.feature.test_feature import NpmRegistryTestFeature
from npmregistry_sdk.feature.timeout_feature import NpmRegistryTimeoutFeature


_FEATURES = {
    "base": lambda: NpmRegistryBaseFeature(),
    "ratelimit": lambda: NpmRegistryRatelimitFeature(),
    "retry": lambda: NpmRegistryRetryFeature(),
    "test": lambda: NpmRegistryTestFeature(),
    "timeout": lambda: NpmRegistryTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
