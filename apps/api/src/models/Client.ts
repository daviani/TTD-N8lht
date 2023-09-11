import mongoose, { Schema } from 'mongoose'
import { Balance, ClientDocument, Operation } from '../type/types'

const operationSchema = new Schema<Operation>({
  uuid: String,
  operation: Number,
  date: Date,
  wording: String,
  amount: Number
})

const balanceSchema = new Schema<Balance>({
  uuid: String,
  date: Date,
  balance: Number
})

const clientSchema = new Schema<ClientDocument>({
  uuid: String,
  clientId: String,
  operations: [operationSchema],
  balances: [balanceSchema]
})

export default mongoose.model<ClientDocument>('Client', clientSchema)
