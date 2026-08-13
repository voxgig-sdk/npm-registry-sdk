# NpmRegistry SDK utility: make_context

from npmregistry_sdk.core.context import NpmRegistryContext


def make_context_util(ctxmap, basectx):
    return NpmRegistryContext(ctxmap, basectx)
