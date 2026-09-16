"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'NpmRegistry',
        slug: "npm-registry",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
    options = {
        base: "https://registry.npmjs.org",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            get_package: {},
            search: {},
        }
    };
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map