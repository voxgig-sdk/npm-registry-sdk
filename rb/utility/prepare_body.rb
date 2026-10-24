# NpmRegistry SDK utility: prepare_body
require_relative 'media'
module NpmRegistryUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return NpmRegistryUtilities.raw_body(ctx.reqdata) if NpmRegistryUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
