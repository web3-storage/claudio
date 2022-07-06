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
    # Encoded basic auth key for the Minibus service
    $ wrangler secret put MINIBUS_BASIC_AUTH --env DEVELOPER
    # (OPTIONAL) Minibus service URL
    $ wrangler secret put MINIBUS_API_URL --env DEVELOPER
    ```
4. Publish `wrangler publish --env DEVELOPER`
