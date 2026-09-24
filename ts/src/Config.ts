
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "short": "Maintainer email",
          "format": "email"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Maintainer username"
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
              "kind": "http",
              "method": "GET",
              "orig": "/{package}",
              "segments": [
                {
                  "var": "id"
                }
              ],
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "package": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "package",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "express"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
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
          "title": "Package",
          "type": "`$OBJECT`"
        },
        {
          "name": "score",
          "title": "Score",
          "type": "`$OBJECT`"
        },
        {
          "name": "searchScore",
          "title": "Search Score",
          "type": "`$NUMBER`",
          "short": "Overall search score",
          "format": "float"
        }
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
                  "lit": "-"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "-",
                "v1",
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.objects`"
              },
              "args": {
                "query": [
                  {
                    "name": "from",
                    "orig": "from",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  },
                  {
                    "name": "maintenance",
                    "orig": "maintenance",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": 0.5
                  },
                  {
                    "name": "popularity",
                    "orig": "popularity",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": 0.98
                  },
                  {
                    "name": "quality",
                    "orig": "quality",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": 0.65
                  },
                  {
                    "name": "size",
                    "orig": "size",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "text",
                    "orig": "text",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "react"
                  }
                ]
              },
              "select": {
                "exist": [
                  "from",
                  "maintenance",
                  "popularity",
                  "quality",
                  "size",
                  "text"
                ]
              }
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

