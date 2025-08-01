import { server, DBObject } from 'appflare/server'
declare global {
  type AppflareEnv = {
    MONGO_URI: string
    MONGO_DB: string
    BUCKET?: R2Bucket
    KV?: KVNamespace
    DURABLE_OBJECT?: DurableObjectNamespace
    STRIPE_SECRET_KEY: string
    STRIPE_SIGNING_SECRET: string
    CF?: CfProperties<any>
  }
  interface CF extends Context {
    env: AppflareEnv
    ctx: ExecutionContext
  }
  interface Context {
    env: AppflareEnv
    ctx: ExecutionContext
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetch: async (request: Request, env: AppflareEnv, cf: CfProperties<any>) => {
    return server(request, {
      ...env,
      MONGO_URI: env.MONGO_URI,
      CF: cf,
    })
  },
}
export { DBObject as MongoDurableObject }
