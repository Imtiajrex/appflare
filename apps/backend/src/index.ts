import { server } from '@appflare/server'
declare global {
  interface Env {
    MONGO_URI: string
    BUCKET?: R2Bucket
    KV?: KVNamespace
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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetch: async (request: Request, env: Env) => {
    return server(request, {
      MONGO_URI: env.MONGO_URI,
      BUCKET: env.BUCKET,
    })
  },
}
