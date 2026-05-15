package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetPackageEntityFunc func(client *NpmRegistrySDK, entopts map[string]any) NpmRegistryEntity

var NewSearchEntityFunc func(client *NpmRegistrySDK, entopts map[string]any) NpmRegistryEntity

