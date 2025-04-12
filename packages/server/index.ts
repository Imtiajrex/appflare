import app from 'app'
import Config from 'lib/config'
import DBClient from 'lib/db'
import { Result } from 'neverthrow'
declare global {
  type ResultType<T> = Result<T, string>
  type _APPFLARE_ENV = {
    MONGO_URI: string
    BUCKET?: R2Bucket
    KV?: KVNamespace
  }
}

export const server = async (request: Request, env: _APPFLARE_ENV) => {
  Config.initialize(env)
  await DBClient.connect()

  return app.fetch(request)
}
