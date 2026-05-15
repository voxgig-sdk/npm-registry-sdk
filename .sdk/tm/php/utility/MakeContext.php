<?php
declare(strict_types=1);

// NpmRegistry SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NpmRegistryMakeContext
{
    public static function call(array $ctxmap, ?NpmRegistryContext $basectx): NpmRegistryContext
    {
        return new NpmRegistryContext($ctxmap, $basectx);
    }
}
