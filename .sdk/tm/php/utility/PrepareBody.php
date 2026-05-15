<?php
declare(strict_types=1);

// NpmRegistry SDK utility: prepare_body

class NpmRegistryPrepareBody
{
    public static function call(NpmRegistryContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
