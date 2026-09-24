"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmRegistryError = void 0;
class NpmRegistryError extends Error {
    isNpmRegistryError = true;
    sdk = 'NpmRegistry';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.NpmRegistryError = NpmRegistryError;
//# sourceMappingURL=NpmRegistryError.js.map