export default {
  /**
   * @param {Request} request
   * @param {import('./bindings').Env} env
   */
  async fetch (request, env) {
    validateEnv(env)
    const sessionId = env.WEBSOCKET_SESSIONS.newUniqueId()
    const session = env.WEBSOCKET_SESSIONS.get(sessionId)
    return session.fetch(request.url, request)
  }
}

/**
 * @param {import('./bindings').Env} env
 */
function validateEnv (env) {
  if (!env.PEER_ID) {
    throw new Error('PEER_ID env var is required')
  }

  if (!env.PEER_PRIVATE_KEY) {
    throw new Error('PEER_PRIVATE_KEY env var is required')
  }

  if (!env.LISTEN_ADDR) {
    throw new Error('LISTEN_ADDR env var is required')
  }

  if (!env.MINIBUS_BASIC_AUTH) {
    throw new Error('MINIBUS_BASIC_AUTH env var is required')
  }
}

export { WebSocketSession as WebSocketSession0 } from './websocket-session.js'
