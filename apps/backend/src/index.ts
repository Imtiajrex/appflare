import Config from '@appflare/config'
import app from './app'
declare global {
  interface Env {
    DB: D1Database
  }
  interface CF extends Context {
    env: Env
    ctx: ExecutionContext
  }
  interface Context {
    env: Env
    ctx: ExecutionContext
  }
}

export default {
  fetch: async (request: Request, env: Env) => {
    Config.initialize(env)
    return app.fetch(request, env)
  },
}
