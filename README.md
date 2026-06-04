# NpmRegistry SDK

Read package metadata, versions, and search results from the public npm registry

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About NPM Registry API

The [npm Registry](https://registry.npmjs.org) is the public package registry that backs the `npm` and other Node.js package managers. It is operated by [npm, Inc.](https://www.npmjs.com) (a subsidiary of GitHub/Microsoft) and serves package metadata and tarballs for millions of JavaScript packages.

What you get from the API:

- `GET /{package}` returns the full "packument" for a package: name, description, `dist-tags`, every published version, timestamps, author, repository, README, and attachments.
- `GET /{package}/{version}` returns a single version document with dependencies, scripts, declared `license`, maintainer info, and the `dist.tarball` URL.
- `GET /-/v1/search?text=...` performs full-text search with `size` (max 250), `from`, and weighted `quality`/`popularity`/`maintenance` modifiers, plus qualifiers like `author:`, `maintainer:`, `scope:`, and `keywords:`.
- `GET /` returns registry-level metadata (document count, disk size, update sequence).

Reads are unauthenticated and CORS-enabled. Publishing and other write operations require an npm account and token, but are outside the scope of this SDK. The registry is a CouchDB-style document store, so package documents can be large; prefer the version-specific endpoint when you only need one release.

## Try it

**TypeScript**
```bash
npm install npm-registry
```

**Python**
```bash
pip install npm-registry-sdk
```

**PHP**
```bash
composer require voxgig/npm-registry-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/npm-registry-sdk/go
```

**Ruby**
```bash
gem install npm-registry-sdk
```

**Lua**
```bash
luarocks install npm-registry-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { NpmRegistrySDK } from 'npm-registry'

const client = new NpmRegistrySDK({})

// List all getpackages
const getpackages = await client.GetPackage().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o npm-registry-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "npm-registry": {
      "command": "/abs/path/to/npm-registry-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GetPackage** | Package metadata documents ("packuments") fetched from `GET /{package}` and individual versions from `GET /{package}/{version}`. | `/{package}` |
| **Search** | Full-text package search backed by `GET /-/v1/search`, with `text`, `size`, `from`, and quality/popularity/maintenance scoring parameters. | `/-/v1/search` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from npmregistry_sdk import NpmRegistrySDK

client = NpmRegistrySDK({})

# List all getpackages
getpackages, err = client.GetPackage(None).list(None, None)
```

### PHP

```php
<?php
require_once 'npmregistry_sdk.php';

$client = new NpmRegistrySDK([]);

// List all getpackages
[$getpackages, $err] = $client->GetPackage(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/npm-registry-sdk/go"

client := sdk.NewNpmRegistrySDK(map[string]any{})

// List all getpackages
getpackages, err := client.GetPackage(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "NpmRegistry_sdk"

client = NpmRegistrySDK.new({})

# List all getpackages
getpackages, err = client.GetPackage(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("npm-registry_sdk")

local client = sdk.new({})

-- List all getpackages
local getpackages, err = client:GetPackage(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = NpmRegistrySDK.test()
const result = await client.GetPackage().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = NpmRegistrySDK.test(None, None)
result, err = client.GetPackage(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = NpmRegistrySDK::test(null, null);
[$result, $err] = $client->GetPackage(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetPackage(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = NpmRegistrySDK.test(nil, nil)
result, err = client.GetPackage(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetPackage(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the NPM Registry API

- Upstream: [https://registry.npmjs.org](https://registry.npmjs.org)
- API docs: [https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md](https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md)

- Registry client tooling and spec are distributed under the ISC licence.
- Individual package documents returned by the registry include each package's own declared `license` field.
- No authentication is required for read-only access to public package metadata.
- CORS is enabled, so the endpoints can be called directly from browsers.

---

Generated from the NPM Registry API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
