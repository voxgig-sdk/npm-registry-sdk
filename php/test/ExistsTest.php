<?php
declare(strict_types=1);

// NpmRegistry SDK exists test

require_once __DIR__ . '/../npmregistry_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = NpmRegistrySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
