-- NpmRegistry SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "NpmRegistry",
      slug = "npm-registry",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://registry.npmjs.org",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_package"] = {},
        ["search"] = {},
      },
    },
    entity = {
      ["get_package"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["short"] = "Maintainer email",
            ["format"] = "email",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Maintainer username",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "get_package",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{package}",
                ["segments"] = {
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["package"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "package",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "express",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["search"] = {
        ["fields"] = {
          {
            ["name"] = "package",
            ["title"] = "Package",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "score",
            ["title"] = "Score",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "searchScore",
            ["title"] = "Search Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Overall search score",
            ["format"] = "float",
          },
        },
        ["name"] = "search",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/-/v1/search",
                ["segments"] = {
                  {
                    ["lit"] = "-",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "-",
                  "v1",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.objects`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "maintenance",
                      ["orig"] = "maintenance",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = 0.5,
                    },
                    {
                      ["name"] = "popularity",
                      ["orig"] = "popularity",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = 0.98,
                    },
                    {
                      ["name"] = "quality",
                      ["orig"] = "quality",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = 0.65,
                    },
                    {
                      ["name"] = "size",
                      ["orig"] = "size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "text",
                      ["orig"] = "text",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "react",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "text",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
