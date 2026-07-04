# Typed models for the NpmRegistry SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GetPackage:
    email: Optional[str] = None
    name: Optional[str] = None


@dataclass
class GetPackageListMatch:
    id: str


@dataclass
class Search:
    package: Optional[dict] = None
    score: Optional[dict] = None
    search_score: Optional[float] = None


@dataclass
class SearchListMatch:
    package: Optional[dict] = None
    score: Optional[dict] = None
    search_score: Optional[float] = None

