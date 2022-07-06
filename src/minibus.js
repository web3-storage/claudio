import { base58btc } from 'multiformats/bases/base58'

export class Minibus {
  /**
   * @param {Object} [options]
   * @param {string|URL} [options.endpoint]
   * @param {Record<string, string>} [options.headers]
   */
  constructor ({ endpoint, headers } = {}) {
    this.endpoint = endpoint || 'https://minibus.web3.storage'
    this.headers = headers || {}
  }

  /** @param {import('multiformats').CID} cid */
  async get (cid) {
    const url = new URL(base58btc.encode(cid.multihash.bytes), this.endpoint)
    const res = await fetch(url, { headers: this.headers })
    if (!res.ok) return
    const buf = await res.arrayBuffer()
    return new Uint8Array(buf)
  }

  /** @param {import('multiformats').CID} cid */
  async has (cid) {
    return Boolean(await this.get(cid))
  }
}
