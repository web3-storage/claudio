import { test, getMiniflare } from './utils/setup.js'

test.before((t) => {
  t.context = {
    mf: getMiniflare()
  }
})

test.skip('Fails when no websockets dial', async t => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://localhost:8787'
  )

  t.assert(response.status)
  t.is(response.status, 426)
  t.is(await response.text(), 'Expected Upgrade: websocket')
})

test.skip('Connects with a libp2p websockets', async t => {
  // We can setup this, but we need to get the raw socket and add it to libp2p client...
})
