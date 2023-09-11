import { MongoClient } from 'mongodb'
import * as request from 'supertest'
import setup from './setup'
import app from '../src'

describe('MongoDB connection', () => {
  let client: MongoClient

  beforeAll(async () => {
    const { mongoUri } = await setup()
    client = new MongoClient(mongoUri)
    await client.connect()
  })

  afterAll(async () => {
    if (client) {
      await client.close()
    }
  })

  it('should connect to MongoDB', async () => {
    const databasesList = await client.db().admin().listDatabases()
    expect(databasesList).toBeDefined()
  })

  it('Should Retrieve All Clients', async () => {
    const response = await request(app).get('/api/client')
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })

  it('Should Return Names of All Existing Clients', async () => {
    const response = await request(app).get('/api/clients/name')
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Client names retrieved successfully')
    expect(response.body.data.length).toBe(4)
  })

  it('Should Retrieve a Client by UUID', async () => {
    const uuidClient = '803c4083-f195-43dd-ad54-dc184b08bfd5'
    const response = await request(app).get(`/api/client/${uuidClient}`)
    expect(response.body.success).toBe(true)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Client found')
  })

  it('Should Return a 404 Error if UUID Does Not Exist', async () => {
    const uuidClient = '803c4083-f195-43dd-ad54-dc184b043fd5'
    const response = await request(app).get(`/api/client/${uuidClient}`)
    expect(response.status).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('No client found')
  })
})
