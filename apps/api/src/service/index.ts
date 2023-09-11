import { v4 as uuidv4 } from 'uuid'
import { accountBalanceService } from './accountBalanceService'
import { checkForDuplicates } from './duplicateVerificationService'
import { generateValidationMessages } from './messageService'
import { MESSAGES } from '../config'
import Client from '../models/Client'
import { ClientDocument, Operation, ValidationResults } from '../type/types'

export const getCheckAccount = async (uuid: string): Promise<ValidationResults | undefined> => {
  try {
    const client: ClientDocument | null = await Client.findOne({ uuid })

    if (client === null) {
      throw new Error(MESSAGES.noClient)
    }

    const operationData: Operation[] = client.operations

    const balance = accountBalanceService(operationData)
    const duplicateVerificationResult = checkForDuplicates(operationData)
    const isNegativeBalance = balance < 0

    const validationMessages = generateValidationMessages({
      uuid: uuidv4(),
      balance,
      isNegativeBalance,
      duplicateVerification: duplicateVerificationResult
    })

    if (validationMessages.message) {
      return validationMessages
    }
  } catch (error) {
    console.error(MESSAGES.checkError, error)
    throw error
  }
}
