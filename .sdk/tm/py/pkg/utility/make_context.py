# NpmRegistry SDK utility: make_context

from projectname_sdk.core.context import NpmRegistryContext


def make_context_util(ctxmap, basectx):
    return NpmRegistryContext(ctxmap, basectx)
