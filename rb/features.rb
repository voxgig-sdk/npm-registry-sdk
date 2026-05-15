# NpmRegistry SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NpmRegistryFeatures
  def self.make_feature(name)
    case name
    when "base"
      NpmRegistryBaseFeature.new
    when "test"
      NpmRegistryTestFeature.new
    else
      NpmRegistryBaseFeature.new
    end
  end
end
