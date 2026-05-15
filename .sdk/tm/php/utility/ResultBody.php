<?php
declare(strict_types=1);

// NpmRegistry SDK utility: result_body

class NpmRegistryResultBody
{
    public static function call(NpmRegistryContext $ctx): ?NpmRegistryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
