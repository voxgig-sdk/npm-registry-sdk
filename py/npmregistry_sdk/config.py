# NpmRegistry SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "NpmRegistry",
            "slug": "npm-registry",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://registry.npmjs.org",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_package": {},
                "search": {},
            },
        },
        "entity": {
      "get_package": {
        "fields": [
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "short": "Maintainer email",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Maintainer username",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "get_package",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/{package}",
                "segments": [
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "package": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "package",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "express",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "package",
            "title": "Package",
            "type": "`$OBJECT`",
          },
          {
            "name": "score",
            "title": "Score",
            "type": "`$OBJECT`",
          },
          {
            "name": "searchScore",
            "title": "Search Score",
            "type": "`$NUMBER`",
            "short": "Overall search score",
            "format": "float",
          },
        ],
        "name": "search",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/-/v1/search",
                "segments": [
                  {
                    "lit": "-",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "-",
                  "v1",
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.objects`",
                },
                "args": {
                  "query": [
                    {
                      "name": "from",
                      "orig": "from",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "maintenance",
                      "orig": "maintenance",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 0.5,
                    },
                    {
                      "name": "popularity",
                      "orig": "popularity",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 0.98,
                    },
                    {
                      "name": "quality",
                      "orig": "quality",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 0.65,
                    },
                    {
                      "name": "size",
                      "orig": "size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "text",
                      "orig": "text",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "react",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "from",
                    "maintenance",
                    "popularity",
                    "quality",
                    "size",
                    "text",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
