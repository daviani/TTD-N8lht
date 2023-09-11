import { MESSAGES } from '../config'
import { ValidationResults } from '../type/types'

export const generateValidationMessages = (validation: ValidationResults) => {
  const reasons = new Set<string>() // Utilisez un ensemble pour stocker les messages d'erreur uniques

  const possibleErrors = {
    operation: MESSAGES.operation,
    wording: MESSAGES.wording,
    amount: MESSAGES.amount
  }

  if (validation.duplicateVerification.duplicates.operation.length > 1) {
    if (possibleErrors.operation) {
      reasons.add(possibleErrors.operation)
    }
  }

  if (validation.duplicateVerification.duplicates.wording.length > 1) {
    if (possibleErrors.wording) {
      reasons.add(possibleErrors.wording)
    }
  }

  if (validation.duplicateVerification.duplicates.amount.length > 1) {
    if (possibleErrors.amount) {
      reasons.add(possibleErrors.amount)
    }
  }

  const messageText = reasons.size === 0 ? MESSAGES.noDuplicadate : MESSAGES.duplicate

  return {
    ...validation,
    message: messageText,
    reasons: [...reasons].join(' ')
  }
}
