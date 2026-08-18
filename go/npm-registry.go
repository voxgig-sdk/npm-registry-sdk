package voxgignpmregistrysdk

import (
	"github.com/voxgig-sdk/npm-registry-sdk/go/core"
	"github.com/voxgig-sdk/npm-registry-sdk/go/entity"
	"github.com/voxgig-sdk/npm-registry-sdk/go/feature"
	_ "github.com/voxgig-sdk/npm-registry-sdk/go/utility"
)

// Type aliases preserve external API.
type NpmRegistrySDK = core.NpmRegistrySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NpmRegistryEntity = core.NpmRegistryEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NpmRegistryError = core.NpmRegistryError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetPackageEntityFunc = func(client *core.NpmRegistrySDK, entopts map[string]any) core.NpmRegistryEntity {
		return entity.NewGetPackageEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.NpmRegistrySDK, entopts map[string]any) core.NpmRegistryEntity {
		return entity.NewSearchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNpmRegistrySDK = core.NewNpmRegistrySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewNpmRegistrySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *NpmRegistrySDK  { return NewNpmRegistrySDK(nil) }
func Test() *NpmRegistrySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
