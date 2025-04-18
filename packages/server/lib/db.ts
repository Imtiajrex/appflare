import { DurableObject } from 'cloudflare:workers'
import Config from 'lib/config'
import { MongoClient, ObjectId } from 'mongodb'
function convertObjectIdsToStrings(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(convertObjectIdsToStrings)
  }

  if (obj instanceof ObjectId) {
    return obj.toHexString()
  }
  if (obj instanceof Date) {
    return obj.toISOString()
  }

  if (typeof obj === 'object') {
    const result = {} as Record<string, any>
    for (const key in obj) {
      if (key === '_id') result['id'] = convertObjectIdsToStrings(obj[key])
      result[key] = convertObjectIdsToStrings(obj[key])
    }
    return result
  }

  return obj
}
const sanitizeClause = (clause: any) => {
  if (!clause) return undefined
  if (typeof clause !== 'string') return clause
  const parsedClause = JSON.parse(clause)
  const sanitizedClause: any = {}
  for (const key in parsedClause) {
    if (
      (key.includes('_id') ||
        key.includes('Id') ||
        key.includes('id') ||
        key.includes('ID') ||
        key.includes('userId')) &&
      parsedClause[key]
    )
      sanitizedClause[key] = ObjectId.createFromHexString(parsedClause[key])
    else sanitizedClause[key] = parsedClause[key]
  }
  return sanitizedClause
}
type DBMethod =
  | 'find'
  | 'insertOne'
  | 'findOne'
  | 'countDocuments'
  | 'findOneAndUpdate'
  | 'updateMany'
  | 'deleteMany'
  | 'findOneAndDelete'
export default class DBObject extends DurableObject {
  private client: MongoClient

  constructor(
    ctx: DurableObjectState,
    env: {
      MONGO_URI: string
    },
  ) {
    super(ctx, env)
    this.client = new MongoClient(env.MONGO_URI)
  }

  async fetch() {
    // Wait for the connection to become available
    await this.client.connect()
    // Do work here
    return new Response('OK')
  }
  async connectDB() {
    // Wait for the connection to become available
    await this.client.connect()
  }
  async close() {
    await this.client.close()
  }
  async call(
    dbName: string,
    collectionName: string,
    method: DBMethod,
    filter: any = '{}',
    data?: any,
    options?: any,
  ): Promise<any> {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const sanitizedFilter = sanitizeClause(filter)
    const sanitizedData = sanitizeClause(data)
    let result: any
    switch (method) {
      case 'find':
        result = await collection.find(sanitizedFilter, options).toArray()
        break
      case 'insertOne':
        result = await collection.insertOne(sanitizedData, options)
        break
      case 'findOne':
        result = await collection.findOne(sanitizedFilter, options)
        break
      case 'countDocuments':
        result = await collection.countDocuments(sanitizedFilter, options)
        break
      case 'findOneAndUpdate':
        result = await collection.findOneAndUpdate(
          sanitizedFilter,
          sanitizedData,
          options,
        )
        break
      case 'updateMany':
        result = await collection.updateMany(
          sanitizedFilter,
          sanitizedData,
          options,
        )
        break
      case 'deleteMany':
        result = await collection.deleteMany(sanitizedFilter, options)
        break
      case 'findOneAndDelete':
        result = await collection.findOneAndDelete(sanitizedFilter, options)
        break
    }
    return JSON.stringify(result)
  }

  async find(
    dbName: string,
    collectionName: string,
    clause: any = {},
  ): Promise<any[]> {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const sanitizedClause = sanitizeClause(clause)
    const data = await collection.find(sanitizedClause).toArray()
    const result = data.map(convertObjectIdsToStrings)
    return result
  }
  async insertOne(dbName: string, collectionName: string, data: any) {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const result = await collection.insertOne(data)
    return convertObjectIdsToStrings(result)
  }
  async findOne(dbName: string, collectionName: string, clause: any = {}) {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const sanitizedClause = sanitizeClause(clause)
    let data = await collection.findOne(sanitizedClause)
    if (data) {
      const result = convertObjectIdsToStrings(data)
      return result
    }
    return null
  }
  async countDocuments(
    dbName: string,
    collectionName: string,
    clause: any = {},
  ) {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const sanitizedClause = sanitizeClause(clause)
    return await collection.countDocuments(sanitizedClause)
  }
  async findOneAndUpdate(
    dbName: string,
    collectionName: string,
    clause: any = {},
    update: any = {},
    options: any = { returnDocument: 'after' },
  ) {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const sanitizedClause = sanitizeClause(clause)
    const data = await collection.findOneAndUpdate(
      sanitizedClause,
      update,
      options,
    )
    if (data) {
      return {
        ...data,
      }
    }
    return null
  }
  async updateMany(
    dbName: string,
    collectionName: string,
    clause: any = {},
    update: any = {},
  ) {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const sanitizedClause = sanitizeClause(clause)
    const data = await collection.updateMany(sanitizedClause, update)

    return data
  }
  async deleteMany(dbName: string, collectionName: string, clause: any = {}) {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const sanitizedClause = sanitizeClause(clause)
    const data = await collection.deleteMany(sanitizedClause)

    return data
  }

  async findOneAndDelete(
    dbName: string,
    collectionName: string,
    clause: any = {},
  ) {
    const db = this.client.db(dbName!)
    const collection = db.collection(collectionName!)
    const sanitizedClause = sanitizeClause(clause)
    const data = await collection.findOneAndDelete(sanitizedClause)

    if (data) {
      return {
        ...data,
      }
    }
    return null
  }
  static getDirectClient() {
    const { config } = Config.getInstance()
    return new MongoClient(config?.MONGO_URI!)
  }
}

export class DBClient {
  static connector: DBObject
  static client: MongoClient
  constructor() {
    const { config } = Config.getInstance()
    const objectId = config?.DURABLE_OBJECT?.idFromName('mongodb')
    DBClient.connector = config?.DURABLE_OBJECT?.get(objectId!, {
      locationHint: 'apac',
    })! as any as DBObject
    DBClient.client = new MongoClient(config?.MONGO_URI!)
  }
  static getDirectClient() {
    return DBClient.client
  }
  static async connect() {
    return await DBClient.client.connect()
  }
}
