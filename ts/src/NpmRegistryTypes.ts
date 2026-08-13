// Typed models for the NpmRegistry SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetPackage {
  email?: string
  name?: string
}

export interface GetPackageListMatch {
  id: string
}

export interface Search {
  package?: Record<string, any>
  score?: Record<string, any>
  searchScore?: number
}

export interface SearchListMatch {
  package?: Record<string, any>
  score?: Record<string, any>
  searchScore?: number
}

