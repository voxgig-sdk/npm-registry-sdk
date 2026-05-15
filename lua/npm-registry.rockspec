package = "voxgig-sdk-npm-registry"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/npm-registry-sdk.git"
}
description = {
  summary = "NpmRegistry SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["npm-registry_sdk"] = "npm-registry_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
