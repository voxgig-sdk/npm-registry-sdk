

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NpmRegistrySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NPM_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('NPM_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NpmRegistrySDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NPM_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"package","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"score","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"format":"float","name":"searchScore","req":false,"short":"Overall search score","type":"`$NUMBER`","index$":2}],"name":"search","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":0,"kind":"query","name":"from","orig":"from","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0.5,"kind":"query","name":"maintenance","orig":"maintenance","reqd":false,"type":"`$NUMBER`","index$":1},{"active":true,"example":0.98,"kind":"query","name":"popularity","orig":"popularity","reqd":false,"type":"`$NUMBER`","index$":2},{"active":true,"example":0.65,"kind":"query","name":"quality","orig":"quality","reqd":false,"type":"`$NUMBER`","index$":3},{"active":true,"example":20,"kind":"query","name":"size","orig":"size","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"example":"react","kind":"query","name":"text","orig":"text","reqd":true,"type":"`$STRING`","index$":5}]},"contract":{"id":"GET /-/v1/search","json":"{\"operationId\":\"searchPackages\",\"parameters\":[{\"description\":\"Search query text\",\"example\":\"react\",\"in\":\"query\",\"name\":\"text\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of results to return\",\"in\":\"query\",\"name\":\"size\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":250,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"from\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Weight for quality score (0.0 to 1.0)\",\"in\":\"query\",\"name\":\"quality\",\"required\":false,\"schema\":{\"default\":0.65,\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Weight for popularity score (0.0 to 1.0)\",\"in\":\"query\",\"name\":\"popularity\",\"required\":false,\"schema\":{\"default\":0.98,\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Weight for maintenance score (0.0 to 1.0)\",\"in\":\"query\",\"name\":\"maintenance\",\"required\":false,\"schema\":{\"default\":0.5,\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"objects\":{\"description\":\"Array of search result objects\",\"items\":{\"properties\":{\"package\":{\"properties\":{\"author\":{\"properties\":{\"email\":{\"description\":\"Person email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"Person name\",\"type\":\"string\"},\"url\":{\"description\":\"Person URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"date\":{\"description\":\"Last publish date\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Package description\",\"type\":\"string\"},\"keywords\":{\"description\":\"Package keywords\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"links\":{\"properties\":{\"bugs\":{\"description\":\"Bug tracker URL\",\"format\":\"uri\",\"type\":\"string\"},\"homepage\":{\"description\":\"Package homepage URL\",\"format\":\"uri\",\"type\":\"string\"},\"npm\":{\"description\":\"NPM package page URL\",\"format\":\"uri\",\"type\":\"string\"},\"repository\":{\"description\":\"Repository URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"maintainers\":{\"description\":\"Package maintainers\",\"items\":{\"properties\":{\"email\":{\"description\":\"Maintainer email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"Maintainer username\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"Package name\",\"type\":\"string\"},\"publisher\":{\"properties\":{\"email\":{\"description\":\"Person email\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"Person name\",\"type\":\"string\"},\"url\":{\"description\":\"Person URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"version\":{\"description\":\"Latest version\",\"type\":\"string\"}},\"type\":\"object\"},\"score\":{\"properties\":{\"detail\":{\"properties\":{\"maintenance\":{\"description\":\"Maintenance score\",\"format\":\"float\",\"type\":\"number\"},\"popularity\":{\"description\":\"Popularity score\",\"format\":\"float\",\"type\":\"number\"},\"quality\":{\"description\":\"Quality score\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"final\":{\"description\":\"Final weighted score\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"searchScore\":{\"description\":\"Overall search score\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"time\":{\"description\":\"Search execution timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"total\":{\"description\":\"Total number of results\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Search results retrieved successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"reason\":{\"description\":\"Error reason\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid search parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/-/v1/search","segments":[{"lit":"-"},{"lit":"v1"},{"lit":"search"}],"select":{"exist":["from","maintenance","popularity","quality","size","text"]},"transform":{"req":"`reqdata`","res":"`body.objects`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":1}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NpmRegistrySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NPM_REGISTRY_TEST_SEARCH_ENTID': idmap,
    'NPM_REGISTRY_TEST_LIVE': 'FALSE',
    'NPM_REGISTRY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NPM_REGISTRY_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.NPM_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NPM_REGISTRY_TEST_SEARCH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NpmRegistrySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
