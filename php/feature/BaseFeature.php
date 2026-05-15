<?php
declare(strict_types=1);

// NpmRegistry SDK base feature

class NpmRegistryBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(NpmRegistryContext $ctx, array $options): void {}
    public function PostConstruct(NpmRegistryContext $ctx): void {}
    public function PostConstructEntity(NpmRegistryContext $ctx): void {}
    public function SetData(NpmRegistryContext $ctx): void {}
    public function GetData(NpmRegistryContext $ctx): void {}
    public function GetMatch(NpmRegistryContext $ctx): void {}
    public function SetMatch(NpmRegistryContext $ctx): void {}
    public function PrePoint(NpmRegistryContext $ctx): void {}
    public function PreSpec(NpmRegistryContext $ctx): void {}
    public function PreRequest(NpmRegistryContext $ctx): void {}
    public function PreResponse(NpmRegistryContext $ctx): void {}
    public function PreResult(NpmRegistryContext $ctx): void {}
    public function PreDone(NpmRegistryContext $ctx): void {}
    public function PreUnexpected(NpmRegistryContext $ctx): void {}
}
