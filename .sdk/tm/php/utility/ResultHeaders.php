<?php
declare(strict_types=1);

// NpmRegistry SDK utility: result_headers

class NpmRegistryResultHeaders
{
    public static function call(NpmRegistryContext $ctx): ?NpmRegistryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
