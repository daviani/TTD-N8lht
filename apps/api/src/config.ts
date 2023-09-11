import * as dotenv from 'dotenv'

dotenv.config({ path: './.env.local' })

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const DB_NAME = process.env.DB_NAME

const DB_CLUSTER = process.env.DB_CLUSTER

export {
  MONGODB_USER,
  MONGODB_PASSWORD,
  DB_NAME,
  DB_CLUSTER
}

export const MESSAGES = {
  successDB: 'Successfully connected to DB:',
  errorDB: 'Error while connecting to the DB:',

  noClient: 'No client found',
  allClient: 'Clients found successfully',
  client: 'Client found',
  errorClient: 'Error while fetching client by ID:',
  clientName: 'Client names retrieved successfully',
  noClientName: 'No client names found',
  errorClientName: 'Error while fetching client names:',

  checkAccount: 'Account check accepted',
  checkError: 'Error checking customer account:',
  serverError: 'An internal server error.',
  errorOperationDelete: 'Error while deleting operation:',
  listen: '👑 Server is running on port',

  operation: 'ID duplication detected.',
  wording: 'Wording duplication detected.',
  amount: 'Amount duplication detected.',
  noDuplicadate: '202 Accepted',
  duplicate: '418 I\'m a teapot'

}
