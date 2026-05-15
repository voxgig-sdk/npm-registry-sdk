
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NpmRegistrySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await NpmRegistrySDK.test()
    equal(null !== testsdk, true)
  })

})
