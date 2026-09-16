# NpmRegistry SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NpmRegistryFeatures
  def self.make_feature(name)
    case name
    when "base"
      NpmRegistryBaseFeature.new
    when "ratelimit"
      NpmRegistryRatelimitFeature.new
    when "retry"
      NpmRegistryRetryFeature.new
    when "test"
      NpmRegistryTestFeature.new
    when "timeout"
      NpmRegistryTimeoutFeature.new
    else
      NpmRegistryBaseFeature.new
    end
  end
end
