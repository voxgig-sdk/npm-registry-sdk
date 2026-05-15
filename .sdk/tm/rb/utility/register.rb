# NpmRegistry SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NpmRegistryUtility.registrar = ->(u) {
  u.clean = NpmRegistryUtilities::Clean
  u.done = NpmRegistryUtilities::Done
  u.make_error = NpmRegistryUtilities::MakeError
  u.feature_add = NpmRegistryUtilities::FeatureAdd
  u.feature_hook = NpmRegistryUtilities::FeatureHook
  u.feature_init = NpmRegistryUtilities::FeatureInit
  u.fetcher = NpmRegistryUtilities::Fetcher
  u.make_fetch_def = NpmRegistryUtilities::MakeFetchDef
  u.make_context = NpmRegistryUtilities::MakeContext
  u.make_options = NpmRegistryUtilities::MakeOptions
  u.make_request = NpmRegistryUtilities::MakeRequest
  u.make_response = NpmRegistryUtilities::MakeResponse
  u.make_result = NpmRegistryUtilities::MakeResult
  u.make_point = NpmRegistryUtilities::MakePoint
  u.make_spec = NpmRegistryUtilities::MakeSpec
  u.make_url = NpmRegistryUtilities::MakeUrl
  u.param = NpmRegistryUtilities::Param
  u.prepare_auth = NpmRegistryUtilities::PrepareAuth
  u.prepare_body = NpmRegistryUtilities::PrepareBody
  u.prepare_headers = NpmRegistryUtilities::PrepareHeaders
  u.prepare_method = NpmRegistryUtilities::PrepareMethod
  u.prepare_params = NpmRegistryUtilities::PrepareParams
  u.prepare_path = NpmRegistryUtilities::PreparePath
  u.prepare_query = NpmRegistryUtilities::PrepareQuery
  u.result_basic = NpmRegistryUtilities::ResultBasic
  u.result_body = NpmRegistryUtilities::ResultBody
  u.result_headers = NpmRegistryUtilities::ResultHeaders
  u.transform_request = NpmRegistryUtilities::TransformRequest
  u.transform_response = NpmRegistryUtilities::TransformResponse
}
