<?php
declare(strict_types=1);

// NpmRegistry SDK utility: feature_add

class NpmRegistryFeatureAdd
{
    public static function call(NpmRegistryContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
