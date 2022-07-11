import { createLibp2p } from 'libp2p'
import { WebSockets } from '@libp2p/websockets'
import { Noise } from '@chainsafe/libp2p-noise'
import { Mplex } from '@libp2p/mplex'
import { createBitswap } from 'ipfs-bitswap'
import { MemoryBlockstore } from 'blockstore-core/memory'
import { CID } from 'multiformats'
import { multiaddr } from '@multiformats/multiaddr'
import { toString } from 'uint8arrays'

async function main () {
  const node = await createLibp2p({
    transports: [new WebSockets()],
    streamMuxers: [new Mplex()],
    connectionEncryption: [new Noise()]
  })

  const blockstore = new MemoryBlockstore()
  const bitswap = createBitswap(node, blockstore)
  bitswap.start()

  await node.start()

  const dialAddr = '/dns4/claudio-staging.protocol-labs.workers.dev/tcp/80/ws/p2p/12D3KooWC7SsELnRThNK7RqZCdHTuhRQAWho14Z8w4MjpypsZWrQ'
  // const dialAddr = '/dns4/localhost/tcp/8787/ws/p2p/12D3KooWC7SsELnRThNK7RqZCdHTuhRQAWho14Z8w4MjpypsZWrQ'
  console.log('dialing', dialAddr)
  await node.dial(multiaddr(dialAddr))

  const cid = CID.parse('zQmNPGiNvMGctTrohEHF9ewVkbtiptpmgMSSV3c3bmJS9TL')
  console.log('bitswapping', cid.toString())
  const data = await bitswap.get(cid.toV1())

  console.log('SUCCESS!', toString(data))
  await node.stop()
}

main().catch(console.error)
