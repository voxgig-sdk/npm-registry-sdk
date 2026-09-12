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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "format": "email",
            "name": "email",
            "short": "Maintainer email",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Maintainer username",
            "type": "`$STRING`",
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
                "args": {
                  "params": [
                    {
                      "example": "express",
                      "kind": "param",
                      "name": "id",
                      "orig": "package",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{package}",
                "rename": {
                  "param": {
                    "package": "id",
                  },
                },
                "segments": [
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "{id}",
                ],
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
            "type": "`$OBJECT`",
          },
          {
            "name": "score",
            "type": "`$OBJECT`",
          },
          {
            "format": "float",
            "name": "searchScore",
            "short": "Overall search score",
            "type": "`$NUMBER`",
          },
        ],
        "name": "search",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0.5,
                      "kind": "query",
                      "name": "maintenance",
                      "orig": "maintenance",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 0.98,
                      "kind": "query",
                      "name": "popularity",
                      "orig": "popularity",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 0.65,
                      "kind": "query",
                      "name": "quality",
                      "orig": "quality",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "size",
                      "orig": "size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "react",
                      "kind": "query",
                      "name": "text",
                      "orig": "text",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.objects`",
                },
                "parts": [
                  "-",
                  "v1",
                  "search",
                ],
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
