export {}

export interface Env {
  PEER_ID: string
  PEER_PRIVATE_KEY: string
  PEER_TYPE: "Ed25519" | "RSA" | "secp256k1"
  LISTEN_ADDR: string
  MINIBUS_BASIC_AUTH: string
  MINIBUS_API_URL?: string
}
