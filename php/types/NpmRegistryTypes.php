<?php
declare(strict_types=1);

// Typed models for the NpmRegistry SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetPackage entity data model. */
class GetPackage
{
    public ?string $email = null;
    public ?string $name = null;
}

/** Request payload for GetPackage#list. */
class GetPackageListMatch
{
    public string $id;
}

/** Search entity data model. */
class Search
{
    public ?array $package = null;
    public ?array $score = null;
    public ?float $search_score = null;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?array $package = null;
    public ?array $score = null;
    public ?float $search_score = null;
}

