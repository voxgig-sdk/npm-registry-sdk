
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'NpmRegistry',
        slug: "npm-registry",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://registry.npmjs.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_package: {
      },

      search: {
      },

    }
  }


  entity = {
    "get_package": {
      "fields": [
        {
          "format": "email",
          "name": "email",
          "short": "Maintainer email",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Maintainer username",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{package}",
              "rename": {
                "param": {
                  "package": "id"
                }
              },
              "segments": [
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "name": "package",
          "type": "`$OBJECT`"
        },
        {
          "name": "score",
          "type": "`$OBJECT`"
        },
        {
          "format": "float",
          "name": "searchScore",
          "short": "Overall search score",
          "type": "`$NUMBER`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 0.5,
                    "kind": "query",
                    "name": "maintenance",
                    "orig": "maintenance",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 0.98,
                    "kind": "query",
                    "name": "popularity",
                    "orig": "popularity",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 0.65,
                    "kind": "query",
                    "name": "quality",
                    "orig": "quality",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "size",
                    "orig": "size",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "react",
                    "kind": "query",
                    "name": "text",
                    "orig": "text",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/-/v1/search",
              "segments": [
                {
                  "lit": "-"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "search"
                }
              ],
              "select": {
                "exist": [
                  "from",
                  "maintenance",
                  "popularity",
                  "quality",
                  "size",
                  "text"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.objects`"
              },
              "parts": [
                "-",
                "v1",
                "search"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

