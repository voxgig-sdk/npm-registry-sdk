-- Typed models for the NpmRegistry SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetPackage
---@field email? string
---@field name? string

---@class GetPackageListMatch
---@field id string

---@class Search
---@field package? table
---@field score? table
---@field searchScore? number

---@class SearchListMatch
---@field package? table
---@field score? table
---@field searchScore? number

local M = {}

return M
