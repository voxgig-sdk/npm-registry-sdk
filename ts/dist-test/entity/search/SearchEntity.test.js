"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NPM_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NPM_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NpmRegistrySDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NPM_REGISTRY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "package": { "a": true, "h": "Package", "n": "package", "r": false, "t": "`$OBJECT`", "key$": "package", "index$": 0 }, "score": { "a": true, "h": "Score", "n": "score", "r": false, "t": "`$OBJECT`", "key$": "score", "index$": 1 }, "searchScore": { "a": true, "fo": "float", "h": "Search Score", "n": "searchScore", "r": false, "sh": "Overall search score", "t": "`$NUMBER`", "key$": "searchScore", "index$": 2 } }, "name": "search", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /-/v1/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 0, "k": "query", "n": "from", "or": "from", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0.5, "k": "query", "n": "maintenance", "or": "maintenance", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "ex": 0.98, "k": "query", "n": "popularity", "or": "popularity", "r": false, "t": "`$NUMBER`", "index$": 2 }, { "a": true, "ex": 0.65, "k": "query", "n": "quality", "or": "quality", "r": false, "t": "`$NUMBER`", "index$": 3 }, { "a": true, "ex": 20, "k": "query", "n": "size", "or": "size", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "ex": "react", "k": "query", "n": "text", "or": "text", "r": true, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/-/v1/search", "q": { "exist": ["from", "maintenance", "popularity", "quality", "size", "text"] }, "r": {}, "s": [{ "lit": "-" }, { "lit": "v1" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body.objects`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 1 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "search_ref01" } }], "index$": 0 }] }, 'Search', { "GET /-/v1/search": { "protocol": "http", "operationId": "searchPackages", "responses": { "200": { "description": "Search results retrieved successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "objects": { "description": "Array of search result objects", "items": { "properties": { "package": { "properties": { "author": { "properties": { "email": { "description": "Person email", "format": "email", "type": "string" }, "name": { "description": "Person name", "type": "string" }, "url": { "description": "Person URL", "format": "uri", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Person" }, "date": { "description": "Last publish date", "format": "date-time", "type": "string" }, "description": { "description": "Package description", "type": "string" }, "keywords": { "description": "Package keywords", "items": { "type": "string" }, "type": "array" }, "links": { "properties": { "bugs": { "description": "Bug tracker URL", "format": "uri", "type": "string" }, "homepage": { "description": "Package homepage URL", "format": "uri", "type": "string" }, "npm": { "description": "NPM package page URL", "format": "uri", "type": "string" }, "repository": { "description": "Repository URL", "format": "uri", "type": "string" } }, "type": "object" }, "maintainers": { "description": "Package maintainers", "items": { "properties": { "email": { "description": "Maintainer email", "format": "email", "type": "string" }, "name": { "description": "Maintainer username", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Maintainer" }, "type": "array" }, "name": { "description": "Package name", "type": "string" }, "publisher": { "properties": { "email": { "description": "Person email", "format": "email", "type": "string" }, "name": { "description": "Person name", "type": "string" }, "url": { "description": "Person URL", "format": "uri", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Person" }, "version": { "description": "Latest version", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/SearchPackage", "key$": "package" }, "score": { "properties": { "detail": { "properties": { "maintenance": { "description": "Maintenance score", "format": "float", "type": "number" }, "popularity": { "description": "Popularity score", "format": "float", "type": "number" }, "quality": { "description": "Quality score", "format": "float", "type": "number" } }, "type": "object" }, "final": { "description": "Final weighted score", "format": "float", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/Score", "key$": "score" }, "searchScore": { "description": "Overall search score", "format": "float", "type": "number", "key$": "searchScore" } }, "type": "object", "x-ref": "#/components/schemas/SearchResultObject", "index$": 0 }, "key$": "objects", "type": "array" }, "total": { "description": "Total number of results", "key$": "total", "type": "integer" }, "time": { "description": "Search execution timestamp", "format": "date-time", "key$": "time", "type": "string" } }, "x-ref": "#/components/schemas/SearchResults" } } } }, "400": { "description": "Invalid search parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error type" }, "reason": { "type": "string", "description": "Error reason" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "text", "in": "query", "required": true, "description": "Search query text", "schema": { "type": "string" }, "example": "react", "index$": 0 }, { "name": "size", "in": "query", "required": false, "description": "Number of results to return", "schema": { "type": "integer", "default": 20, "minimum": 1, "maximum": 250 }, "index$": 1 }, { "name": "from", "in": "query", "required": false, "description": "Offset for pagination", "schema": { "type": "integer", "default": 0, "minimum": 0 }, "index$": 2 }, { "name": "quality", "in": "query", "required": false, "description": "Weight for quality score (0.0 to 1.0)", "schema": { "type": "number", "format": "float", "minimum": 0, "maximum": 1, "default": 0.65 }, "index$": 3 }, { "name": "popularity", "in": "query", "required": false, "description": "Weight for popularity score (0.0 to 1.0)", "schema": { "type": "number", "format": "float", "minimum": 0, "maximum": 1, "default": 0.98 }, "index$": 4 }, { "name": "maintenance", "in": "query", "required": false, "description": "Weight for maintenance score (0.0 to 1.0)", "schema": { "type": "number", "format": "float", "minimum": 0, "maximum": 1, "default": 0.5 }, "index$": 5 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LIST
        const search_ref01_ent = client.Search();
        const search_ref01_match = {};
        const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NpmRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NPM_REGISTRY_TEST_SEARCH_ENTID': idmap,
        'NPM_REGISTRY_TEST_LIVE': 'FALSE',
        'NPM_REGISTRY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['NPM_REGISTRY_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.NPM_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NPM_REGISTRY_TEST_SEARCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NpmRegistrySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NPM_REGISTRY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=SearchEntity.test.js.map