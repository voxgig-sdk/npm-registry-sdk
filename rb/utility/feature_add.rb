# NpmRegistry SDK utility: feature_add
module NpmRegistryUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
