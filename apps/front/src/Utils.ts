import { CheckAccount } from './types/types'

export const CONSTANTS = {
  GLOBAL_API_URL: 'http://localhost:3000/api',
  CLIENTS: 'clients',
  CLIENT: 'client',
  NAME_URL: 'name',
  CHECK_ACCOUNT_URL: 'check-account',
  OPERATIONS: 'operations',
  OPERATION: 'operation'

}

export const emptyCheckAccountResponse: CheckAccount = {
  success: false,
  message: '',
  data: {
    balance: 0,
    isNegativeBalance: false,
    duplicateVerification: {
      duplicates: {
        operation: [],
        wording: [],
        amount: []
      }
    },
    message: '',
    reasons: ''
  }
}

export const emptyClientDetailsResponse = {
  success: false,
  message: '',
  data: {
    uuid: '',
    clientId: '',
    operation: '',
    operations: [],
    balances: []
  }
}
