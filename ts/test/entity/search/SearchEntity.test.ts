

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NpmRegistrySDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('search hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of NpmRegistrySDK.test(offline).Search().stream('list')) { }
    }, /offline/)

    for await (const _item of NpmRegistrySDK.test(offline).Search()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = NpmRegistrySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Search().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of NpmRegistrySDK.test().Search().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new NpmRegistrySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Search().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Search().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = NpmRegistrySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Search().list({"from":"x","text":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NPM_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"package":{"a":true,"h":"Package","n":"package","r":false,"t":"`$OBJECT`","key$":"package","index$":0},"score":{"a":true,"h":"Score","n":"score","r":false,"t":"`$OBJECT`","key$":"score","index$":1},"searchScore":{"a":true,"fo":"float","h":"Search Score","n":"searchScore","r":false,"sh":"Overall search score","t":"`$NUMBER`","key$":"searchScore","index$":2}},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /-/v1/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":0,"k":"query","n":"from","or":"from","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0.5,"k":"query","n":"maintenance","or":"maintenance","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":0.98,"k":"query","n":"popularity","or":"popularity","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"ex":0.65,"k":"query","n":"quality","or":"quality","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"ex":20,"k":"query","n":"size","or":"size","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":"react","k":"query","n":"text","or":"text","r":true,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/-/v1/search","q":{"exist":["text"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"-"},{"lit":"v1"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.objects`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":1}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search', {"GET /-/v1/search":{"protocol":"http","parameters":[{"name":"text","in":"query","required":true,"description":"Search query text","schema":{"type":"string"},"example":"react","index$":0},{"name":"size","in":"query","required":false,"description":"Number of results to return","schema":{"type":"integer","default":20,"minimum":1,"maximum":250},"index$":1},{"name":"from","in":"query","required":false,"description":"Offset for pagination","schema":{"type":"integer","default":0,"minimum":0},"index$":2},{"name":"quality","in":"query","required":false,"description":"Weight for quality score (0.0 to 1.0)","schema":{"type":"number","format":"float","minimum":0,"maximum":1,"default":0.65},"index$":3},{"name":"popularity","in":"query","required":false,"description":"Weight for popularity score (0.0 to 1.0)","schema":{"type":"number","format":"float","minimum":0,"maximum":1,"default":0.98},"index$":4},{"name":"maintenance","in":"query","required":false,"description":"Weight for maintenance score (0.0 to 1.0)","schema":{"type":"number","format":"float","minimum":0,"maximum":1,"default":0.5},"index$":5}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
