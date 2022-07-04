# cf-bitswap-peer

IPFS Bitswap peer in Cloudflare workers.

## Usage

1. Add your env section to `wrangler.toml`
2. Dev `wrangler dev --env DEVELOPER`
3. Set secrets:
    ```console
    # base58btc encoded multihash
    $ wrangler secret put PEER_ID --env DEVELOPER
    # base64pad encoded private key
    $ wrangler secret put PEER_PRIVATE_KEY --env DEVELOPER
    # Listening multiaddr (without peer ID)
    $ wrangler secret put LISTEN_ADDR --env DEVELOPER
    ```
4. Publish `wrangler publish --env DEVELOPER`
