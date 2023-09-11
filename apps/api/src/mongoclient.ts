import mongoose, { Mongoose } from 'mongoose'
import { DB_CLUSTER, DB_NAME, MONGODB_PASSWORD, MONGODB_USER } from './config'

export const URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}`

const initialize: () => Promise<Mongoose> = async () => {
  try {
    return await mongoose.connect(URI)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}

export default { initialize, URI }
