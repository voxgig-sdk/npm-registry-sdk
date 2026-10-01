

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetPackageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NPM_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('NPM_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NpmRegistrySDK.test()
    const ent = testsdk.GetPackage()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NPM_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_package.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"sh":"Maintainer email","t":"`$STRING`","key$":"email","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Maintainer username","t":"`$STRING`","key$":"name","index$":2}},"id":{"field":"id","name":"id"},"name":"get_package","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{package}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"express","k":"param","n":"id","or":"package","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{package}","q":{"exist":["id"]},"r":{"param":{"package":"id"}},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_package","name__orig":"get_package","Name":"GetPackage","name_":"get_package","name-":"get-package","NAME":"GET_PACKAGE","index$":0}, {"active":true,"entity":"get_package","key$":"BasicGetPackageFlow","kind":"basic","name":"BasicGetPackageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"package":"package01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_package_ref01"}}],"index$":0}]}, 'GetPackage', {"GET /{package}":{"protocol":"http","parameters":[{"name":"package","in":"path","required":true,"description":"The name of the package","schema":{"type":"string"},"example":"express","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_package_ref01_data = Object.values(setup.data.existing.get_package)[0] as any

    // LIST
    const get_package_ref01_ent = client.GetPackage()
    const get_package_ref01_match: any = {}
    get_package_ref01_match['package'] = setup.idmap['package01']

    const get_package_ref01_list = (await get_package_ref01_ent.list(get_package_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_package/GetPackageTestData.json')

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
    ['get_package01','get_package02','get_package03','package01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NPM_REGISTRY_TEST_GET_PACKAGE_ENTID': idmap,
    'NPM_REGISTRY_TEST_LIVE': 'FALSE',
    'NPM_REGISTRY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NPM_REGISTRY_TEST_GET_PACKAGE_ENTID']

  const live = 'TRUE' === env.NPM_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NPM_REGISTRY_TEST_GET_PACKAGE_ENTID']
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
  
