# NpmRegistry SDK exists test

require "minitest/autorun"
require_relative "../NpmRegistry_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = NpmRegistrySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
