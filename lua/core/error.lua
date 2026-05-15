-- NpmRegistry SDK error

local NpmRegistryError = {}
NpmRegistryError.__index = NpmRegistryError


function NpmRegistryError.new(code, msg, ctx)
  local self = setmetatable({}, NpmRegistryError)
  self.is_sdk_error = true
  self.sdk = "NpmRegistry"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NpmRegistryError:error()
  return self.msg
end


function NpmRegistryError:__tostring()
  return self.msg
end


return NpmRegistryError
