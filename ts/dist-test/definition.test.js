"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
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
        "query": [],
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
                    "email": "x",
                    "name": "x"
                }
            ],
            "time": {},
            "author": {
                "email": "x",
                "name": "x",
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
            "from": "v1",
            "maintenance": "v1",
            "popularity": "v1",
            "quality": "v1",
            "size": "v1",
            "text": "react"
        },
        "headers": [],
        "query": [
            "text",
            "size",
            "from",
            "quality",
            "popularity",
            "maintenance"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "objects": [
                {
                    "package": {
                        "author": {
                            "email": "x",
                            "name": "x",
                            "url": "x"
                        },
                        "date": "2026-01-01T00:00:00Z",
                        "description": "x",
                        "keywords": [
                            "x"
                        ],
                        "links": {
                            "bugs": "x",
                            "homepage": "x",
                            "npm": "x",
                            "repository": "x"
                        },
                        "maintainers": [
                            {
                                "email": "x",
                                "name": "x"
                            }
                        ],
                        "name": "x",
                        "publisher": {
                            "email": "x",
                            "name": "x",
                            "url": "x"
                        },
                        "version": "x"
                    },
                    "score": {
                        "detail": {
                            "maintenance": 1,
                            "popularity": 1,
                            "quality": 1
                        },
                        "final": 1
                    },
                    "searchScore": 1
                }
            ],
            "total": 1,
            "time": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map