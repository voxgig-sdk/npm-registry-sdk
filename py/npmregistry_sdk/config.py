# NpmRegistry SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "package": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$OBJECT`",
          },
          {
            "name": "score",
            "type": "`$OBJECT`",
          },
          {
            "name": "searchScore",
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
                "parts": [
                  "-",
                  "v1",
                  "search",
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
