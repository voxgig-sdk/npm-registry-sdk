<?php
declare(strict_types=1);

// NpmRegistry SDK configuration

class NpmRegistryConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "NpmRegistry",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://registry.npmjs.org",
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'active' => true,
              'name' => 'email',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
          ],
          'name' => 'get_package',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'express',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'package',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'package',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'score',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'search_score',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 2,
            ],
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 0.5,
                        'kind' => 'query',
                        'name' => 'maintenance',
                        'orig' => 'maintenance',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => 0.98,
                        'kind' => 'query',
                        'name' => 'popularity',
                        'orig' => 'popularity',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => 0.65,
                        'kind' => 'query',
                        'name' => 'quality',
                        'orig' => 'quality',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'size',
                        'orig' => 'size',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 'react',
                        'kind' => 'query',
                        'name' => 'text',
                        'orig' => 'text',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
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
