# NpmRegistry SDK configuration

module NpmRegistryConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "NpmRegistry",
        "slug" => "npm-registry",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://registry.npmjs.org",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_package" => {},
          "search" => {},
        },
      },
      "entity" => {
        "get_package" => {
          "fields" => [
            {
              "format" => "email",
              "name" => "email",
              "short" => "Maintainer email",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Maintainer username",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_package",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "express",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "package",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{package}",
                  "rename" => {
                    "param" => {
                      "package" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "search" => {
          "fields" => [
            {
              "name" => "package",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "score",
              "type" => "`$OBJECT`",
            },
            {
              "format" => "float",
              "name" => "searchScore",
              "short" => "Overall search score",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "search",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "from",
                        "orig" => "from",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0.5,
                        "kind" => "query",
                        "name" => "maintenance",
                        "orig" => "maintenance",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => 0.98,
                        "kind" => "query",
                        "name" => "popularity",
                        "orig" => "popularity",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => 0.65,
                        "kind" => "query",
                        "name" => "quality",
                        "orig" => "quality",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "size",
                        "orig" => "size",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "react",
                        "kind" => "query",
                        "name" => "text",
                        "orig" => "text",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/-/v1/search",
                  "segments" => [
                    {
                      "lit" => "-",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                      "maintenance",
                      "popularity",
                      "quality",
                      "size",
                      "text",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.objects`",
                  },
                  "parts" => [
                    "-",
                    "v1",
                    "search",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    NpmRegistryFeatures.make_feature(name)
  end
end
