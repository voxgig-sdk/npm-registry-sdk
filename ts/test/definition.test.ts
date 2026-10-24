import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "get_package",
    "accessor": "GetPackage",
    "op": "list",
    "method": "GET",
    "path": "/{package}",
    "args": [
      {
        "name": "id",
        "wire": "package",
        "value": "express"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "_id": "x",
      "_rev": "x",
      "name": "x",
      "description": "x",
      "dist-tags": {},
      "versions": {},
      "maintainers": [
        {
          "name": "x",
          "email": "x"
        }
      ],
      "time": {},
      "author": {
        "name": "x",
        "email": "x",
        "url": "x"
      },
      "repository": {
        "type": "git",
        "url": "x"
      },
      "readme": "x",
      "readmeFilename": "x",
      "homepage": "x",
      "keywords": [
        "x"
      ],
      "license": "x"
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/-/v1/search",
    "args": [],
    "select": {
      "text": "react",
      "from": 0,
      "maintenance": 0.5,
      "popularity": 0.98,
      "quality": 0.65,
      "size": 20
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "text",
      "size",
      "from",
      "quality",
      "popularity",
      "maintenance"
    ],
    "queryArgs": [
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "maintenance",
        "wire": "maintenance"
      },
      {
        "name": "popularity",
        "wire": "popularity"
      },
      {
        "name": "quality",
        "wire": "quality"
      },
      {
        "name": "size",
        "wire": "size"
      },
      {
        "name": "text",
        "wire": "text"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "objects": [
        {
          "package": {
            "name": "x",
            "version": "x",
            "description": "x",
            "keywords": [
              "x"
            ],
            "date": "2026-01-01T00:00:00Z",
            "links": {
              "npm": "x",
              "homepage": "x",
              "repository": "x",
              "bugs": "x"
            },
            "author": {
              "name": "x",
              "email": "x",
              "url": "x"
            },
            "publisher": {
              "name": "x",
              "email": "x",
              "url": "x"
            },
            "maintainers": [
              {
                "name": "x",
                "email": "x"
              }
            ]
          },
          "score": {
            "final": 1,
            "detail": {
              "quality": 1,
              "popularity": 1,
              "maintenance": 1
            }
          },
          "searchScore": 1
        }
      ],
      "total": 1,
      "time": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
