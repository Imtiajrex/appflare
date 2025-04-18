import app from 'app'
import Config from 'lib/config'
import DBObject, { DBClient } from 'lib/db'
import { Result } from 'neverthrow'
declare global {
  type ResultType<T> = Result<T, string>
  type _APPFLARE_ENV = {
    MONGO_URI: string
    BUCKET?: R2Bucket
    KV?: KVNamespace
    DURABLE_OBJECT?: DurableObjectNamespace<DBObject>
  }
}

export const server = async (request: Request, env: _APPFLARE_ENV) => {
  Config.initialize(env)
  new DBClient()
  await DBClient.connector.connectDB()
  // const data = await DBClient.connector.find('__appflare__', 'session', {})
  // console.log('data', data)
  // return Response.json({
  //   message: 'Server is running',
  //   data: data,
  // })
  return app.fetch(request)
}
export { DBObject }
