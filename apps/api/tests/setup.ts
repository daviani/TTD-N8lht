import { DB_CLUSTER, DB_NAME, MONGODB_PASSWORD, MONGODB_USER } from '../src/config'

export default async () => {
  const encodedPassword = encodeURIComponent(MONGODB_PASSWORD ?? '')
  const mongoUri = `mongodb+srv://${MONGODB_USER}:${encodedPassword}@${DB_CLUSTER}.mongodb.net/${DB_NAME}`

  return {
    mongoUri
  }
}
