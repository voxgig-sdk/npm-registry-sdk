# frozen_string_literal: true

# Typed models for the NpmRegistry SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetPackage entity data model.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
GetPackage = Struct.new(
  :email,
  :name,
  keyword_init: true
)

# Request payload for GetPackage#list.
#
# @!attribute [rw] id
#   @return [String]
GetPackageListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] package
#   @return [Hash, nil]
#
# @!attribute [rw] score
#   @return [Hash, nil]
#
# @!attribute [rw] search_score
#   @return [Float, nil]
Search = Struct.new(
  :package,
  :score,
  :search_score,
  keyword_init: true
)

# Match filter for Search#list (any subset of Search fields).
#
# @!attribute [rw] package
#   @return [Hash, nil]
#
# @!attribute [rw] score
#   @return [Hash, nil]
#
# @!attribute [rw] search_score
#   @return [Float, nil]
SearchListMatch = Struct.new(
  :package,
  :score,
  :search_score,
  keyword_init: true
)

