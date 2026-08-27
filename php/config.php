<?php
declare(strict_types=1);

// NpmRegistry SDK configuration

class NpmRegistryConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "NpmRegistry",
                "slug" => "npm-registry",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://registry.npmjs.org",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_package" => [],
                    "search" => [],
                ],
            ],
            "entity" => [
        'get_package' => [
          'fields' => [
            [
              'name' => 'email',
              'short' => 'Maintainer email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Maintainer username',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_package',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'express',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'package',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{package}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'package' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'package',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'score',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'searchScore',
              'short' => 'Overall search score',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0.5,
                        'kind' => 'query',
                        'name' => 'maintenance',
                        'orig' => 'maintenance',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 0.98,
                        'kind' => 'query',
                        'name' => 'popularity',
                        'orig' => 'popularity',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 0.65,
                        'kind' => 'query',
                        'name' => 'quality',
                        'orig' => 'quality',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'size',
                        'orig' => 'size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'react',
                        'kind' => 'query',
                        'name' => 'text',
                        'orig' => 'text',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/-/v1/search',
                  'parts' => [
                    '-',
                    'v1',
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                      'maintenance',
                      'popularity',
                      'quality',
                      'size',
                      'text',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.objects`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return NpmRegistryFeatures::make_feature($name);
    }
}
