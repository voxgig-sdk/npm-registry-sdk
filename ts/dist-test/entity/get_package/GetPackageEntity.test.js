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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetPackageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NPM_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NPM_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NpmRegistrySDK.test();
        const ent = testsdk.GetPackage();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NPM_REGISTRY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_package.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "email", "name": "email", "req": false, "short": "Maintainer email", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "name", "req": false, "short": "Maintainer username", "type": "`$STRING`", "index$": 2 }], "id": { "field": "id", "name": "id" }, "name": "get_package", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "express", "kind": "param", "name": "id", "orig": "package", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /{package}", "json": "{\"operationId\":\"getPackage\",\"parameters\":[{\"description\":\"The name of the package\",\"example\":\"express\",\"in\":\"path\",\"name\":\"package\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Package identifier\",\"type\":\"string\"},\"_rev\":{\"description\":\"Revision identifier\",\"type\":\"string\"},\"author\":{\"properties\":{\"email\":{\"description\":\"Person email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"Person name\",\"type\":\"string\"},\"url\":{\"description\":\"Person URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"Package description\",\"type\":\"string\"},\"dist-tags\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Distribution tags mapping to versions\",\"type\":\"object\"},\"homepage\":{\"description\":\"Package homepage URL\",\"type\":\"string\"},\"keywords\":{\"description\":\"Package keywords\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"license\":{\"description\":\"Package license\",\"type\":\"string\"},\"maintainers\":{\"description\":\"Package maintainers\",\"items\":{\"properties\":{\"email\":{\"description\":\"Maintainer email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"Maintainer username\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"Package name\",\"type\":\"string\"},\"readme\":{\"description\":\"Package README content\",\"type\":\"string\"},\"readmeFilename\":{\"description\":\"Name of the README file\",\"type\":\"string\"},\"repository\":{\"properties\":{\"type\":{\"description\":\"Repository type\",\"example\":\"git\",\"type\":\"string\"},\"url\":{\"description\":\"Repository URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"time\":{\"additionalProperties\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":\"Timestamps for each version\",\"type\":\"object\"},\"versions\":{\"additionalProperties\":{\"properties\":{\"_id\":{\"description\":\"Version identifier\",\"type\":\"string\"},\"_nodeVersion\":{\"description\":\"Node version used to publish\",\"type\":\"string\"},\"_npmVersion\":{\"description\":\"NPM version used to publish\",\"type\":\"string\"},\"author\":{\"properties\":{\"email\":{\"description\":\"Person email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"Person name\",\"type\":\"string\"},\"url\":{\"description\":\"Person URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"dependencies\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Package dependencies\",\"type\":\"object\"},\"description\":{\"description\":\"Version description\",\"type\":\"string\"},\"devDependencies\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Development dependencies\",\"type\":\"object\"},\"dist\":{\"properties\":{\"fileCount\":{\"description\":\"Number of files in package\",\"type\":\"integer\"},\"integrity\":{\"description\":\"Subresource integrity hash\",\"type\":\"string\"},\"shasum\":{\"description\":\"SHA-1 checksum\",\"type\":\"string\"},\"tarball\":{\"description\":\"URL to tarball\",\"format\":\"uri\",\"type\":\"string\"},\"unpackedSize\":{\"description\":\"Unpacked size in bytes\",\"type\":\"integer\"}},\"type\":\"object\"},\"license\":{\"description\":\"Package license\",\"type\":\"string\"},\"main\":{\"description\":\"Main entry point\",\"type\":\"string\"},\"name\":{\"description\":\"Package name\",\"type\":\"string\"},\"peerDependencies\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Peer dependencies\",\"type\":\"object\"},\"scripts\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"NPM scripts\",\"type\":\"object\"},\"version\":{\"description\":\"Version number\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"All versions of the package\",\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Package metadata retrieved successfully\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"reason\":{\"description\":\"Error reason\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Package not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{package}", "rename": { "param": { "package": "id" } }, "segments": [{ "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "get_package", "name__orig": "get_package", "Name": "GetPackage", "name_": "get_package", "name-": "get-package", "NAME": "GET_PACKAGE", "index$": 0 }, { "active": true, "entity": "get_package", "key$": "BasicGetPackageFlow", "kind": "basic", "name": "BasicGetPackageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "package": "package01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "get_package_ref01" } }], "index$": 0 }] }, 'GetPackage');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_package_ref01_data = Object.values(setup.data.existing.get_package)[0];
        // LIST
        const get_package_ref01_ent = client.GetPackage();
        const get_package_ref01_match = {};
        get_package_ref01_match['package'] = setup.idmap['package01'];
        const get_package_ref01_list = (await get_package_ref01_ent.list(get_package_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_package/GetPackageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NpmRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_package01', 'get_package02', 'get_package03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NPM_REGISTRY_TEST_GET_PACKAGE_ENTID': idmap,
        'NPM_REGISTRY_TEST_LIVE': 'FALSE',
        'NPM_REGISTRY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['NPM_REGISTRY_TEST_GET_PACKAGE_ENTID'];
    const live = 'TRUE' === env.NPM_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NPM_REGISTRY_TEST_GET_PACKAGE_ENTID'];
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
//# sourceMappingURL=GetPackageEntity.test.js.map