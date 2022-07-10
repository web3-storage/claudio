import { Miniflare } from 'miniflare'
import { globals } from './worker-globals.js'

export function getMiniflare () {
  return new Miniflare({
    scriptPath: 'dist/worker.mjs',
    port: 8788,
    packagePath: true,
    wranglerConfigPath: true,
    // We don't want to rebuild our worker for each test, we're already doing
    // it once before we run all tests in package.json, so disable it here.
    // This will override the option in wrangler.toml.
    buildCommand: undefined,
    wranglerConfigEnv: 'test',
    modules: true,
    bindings: {
      ...globals
    }
  })
}
