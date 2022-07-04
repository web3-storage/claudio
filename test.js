import { createLibp2p } from 'libp2p'
import { WebSockets } from '@libp2p/websockets'
import { Noise } from '@chainsafe/libp2p-noise'
import { Mplex } from '@libp2p/mplex'

async function main () {
  const node = await createLibp2p({
    transports: [new WebSockets()],
    streamMuxers: [new Mplex()],
    connectionEncryption: [new Noise()]
  })

  await node.start()

  const dialAddr = '/dns4/cf-bitswap-peer-alanshaw.alanshaw-pl.workers.dev/tcp/80/ws/p2p/12D3KooWPXCexBU8e8BDUspmR4PVAAz4rgLckgSDhUPS5pJvVdpu'
  console.log('pinging', dialAddr)
  const rtt = await node.ping(dialAddr)
  console.log('SUCCESS!', rtt, 'ms')
  await node.stop()
}

main().catch(console.error)
