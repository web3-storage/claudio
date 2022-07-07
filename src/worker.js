import { createLibp2p } from 'libp2p'
import { WebSockets } from 'cf-libp2p-ws-transport'
import { Mplex } from '@libp2p/mplex'
import { createPeerId } from '@libp2p/peer-id'
import * as Digest from 'multiformats/hashes/digest'
import { fromString } from 'uint8arrays/from-string'
import { Miniswap, BITSWAP_PROTOCOL } from 'miniswap'
import { Minibus } from '@web3-storage/minibus'
// import { enable } from '@libp2p/logger'
// enable('libp2p*')

export default {
  /**
   * @param {Request} request
   * @param {Record<string, string>} env
   */
  async fetch (request, env) {
    const { Noise } = await import('@chainsafe/libp2p-noise')
    const peerId = createPeerId({
      type: env.PEER_TYPE || 'Ed25519',
      multihash: Digest.decode(fromString(env.PEER_ID, 'base58btc')),
      privateKey: fromString(env.PEER_PRIVATE_KEY, 'base64pad')
    })
    peerId.publicKey = peerId.multihash.digest
    const listenAddr = env.LISTEN_ADDR
    const wsTransport = new WebSockets()
    const node = await createLibp2p({
      peerId,
      addresses: { listen: [listenAddr] },
      transports: [wsTransport],
      streamMuxers: [new Mplex()],
      connectionEncryption: [new Noise()]
    })

    const minibus = new Minibus({
      endpoint: env.MINIBUS_API_URL,
      headers: { Authorization: `Basic ${env.MINIBUS_BASIC_AUTH}` }
    })
    const miniswap = new Miniswap(minibus)

    node.handle(BITSWAP_PROTOCOL, miniswap.handler)

    await node.start()

    const listener = wsTransport.listenerForMultiaddr(listenAddr)
    return listener.handleRequest(request)
  }
}
