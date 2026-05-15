<?php
declare(strict_types=1);

// NpmRegistry SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NpmRegistryFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NpmRegistryBaseFeature();
            case "test":
                return new NpmRegistryTestFeature();
            default:
                return new NpmRegistryBaseFeature();
        }
    }
}
