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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'format' => 'email',
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
          'id' => [
            'field' => 'id',
            'name' => 'id',
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
                  'rename' => [
                    'param' => [
                      'package' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'var' => 'id',
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
                  'parts' => [
                    '{id}',
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
              'format' => 'float',
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
                  'segments' => [
                    [
                      'lit' => '-',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'search',
                    ],
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
                  'parts' => [
                    '-',
                    'v1',
                    'search',
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
