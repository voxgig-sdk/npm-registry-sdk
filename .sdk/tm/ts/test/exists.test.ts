
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NpmRegistrySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NpmRegistrySDK.test()
    equal(testsdk instanceof NpmRegistrySDK, true,
      'NpmRegistrySDK.test() must return a client synchronously')
  })

})
