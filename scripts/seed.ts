import { MongoClient } from 'mongodb'
import { seedDatabase } from './seed-database'

const uri = process.env.SEED_MONGODB_URI
const dbName = process.env.NUXT_MONGODB_DB_NAME || 'portfolio'

if (!uri) {
  console.error('SEED_MONGODB_URI is not set. Add it to .env (a user with readWrite access).')
  process.exit(1)
}

const client = new MongoClient(uri)

try {
  await client.connect()
  const summary = await seedDatabase(client.db(dbName))
  console.log(`Seeded database "${dbName}":`)
  console.table(summary)
}
catch (error) {
  console.error('Seeding failed:', error)
  process.exitCode = 1
}
finally {
  await client.close()
}
