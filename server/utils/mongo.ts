import { MongoClient, type Db } from 'mongodb'

// Reused across invocations of the same serverless instance.
let clientPromise: Promise<MongoClient> | undefined

export async function getDb(): Promise<Db> {
  const { mongodbUri, mongodbDbName } = useRuntimeConfig()
  if (!mongodbUri) {
    throw new Error('NUXT_MONGODB_URI is not configured')
  }

  clientPromise ??= MongoClient.connect(mongodbUri).catch((error) => {
    clientPromise = undefined
    throw error
  })

  const client = await clientPromise
  return client.db(mongodbDbName)
}
