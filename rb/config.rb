# NpmRegistry SDK configuration

module NpmRegistryConfig
  def self.make_config
    {
      "main" => {
        "name" => "NpmRegistry",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "name" => "email",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "get_package",
          "op" => {
            "list" => {
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
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/{package}",
                  "parts" => [
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "package" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
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
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "score",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "search_score",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "search",
          "op" => {
            "list" => {
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
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 0.5,
                        "kind" => "query",
                        "name" => "maintenance",
                        "orig" => "maintenance",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => 0.98,
                        "kind" => "query",
                        "name" => "popularity",
                        "orig" => "popularity",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => 0.65,
                        "kind" => "query",
                        "name" => "quality",
                        "orig" => "quality",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "size",
                        "orig" => "size",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => "react",
                        "kind" => "query",
                        "name" => "text",
                        "orig" => "text",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/-/v1/search",
                  "parts" => [
                    "-",
                    "v1",
                    "search",
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
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
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
