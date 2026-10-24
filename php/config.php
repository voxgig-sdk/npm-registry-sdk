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
            'now' => '`$FUNCTION`',
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
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'short' => 'Maintainer email',
              'format' => 'email',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Maintainer username',
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
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{package}',
                  'segments' => [
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'package' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'package',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'express',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
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
              'title' => 'Package',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'score',
              'title' => 'Score',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'searchScore',
              'title' => 'Search Score',
              'type' => '`$NUMBER`',
              'short' => 'Overall search score',
              'format' => 'float',
            ],
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
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
                  'parts' => [
                    '-',
                    'v1',
                    'search',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.objects`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'from',
                        'orig' => 'from',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'maintenance',
                        'orig' => 'maintenance',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'example' => 0.5,
                      ],
                      [
                        'name' => 'popularity',
                        'orig' => 'popularity',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'example' => 0.98,
                      ],
                      [
                        'name' => 'quality',
                        'orig' => 'quality',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'example' => 0.65,
                      ],
                      [
                        'name' => 'size',
                        'orig' => 'size',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'text',
                        'orig' => 'text',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'react',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'text',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
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
