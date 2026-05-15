# NpmRegistry SDK utility: make_context
require_relative '../core/context'
module NpmRegistryUtilities
  MakeContext = ->(ctxmap, basectx) {
    NpmRegistryContext.new(ctxmap, basectx)
  }
end
