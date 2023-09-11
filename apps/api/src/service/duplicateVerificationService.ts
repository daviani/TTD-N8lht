import { Operation, DuplicateVerificationResult } from '../type/types'

const addDuplicate = (
  duplicates: { original: Operation; duplicate: Operation }[],
  original: Operation,
  duplicate: Operation
) => {
  duplicates.push({ original, duplicate })
}

export const checkForDuplicates = (operations: Operation[]): DuplicateVerificationResult => {
  const duplicateVerificationResult: DuplicateVerificationResult = {

    duplicates: {
      operation: [],
      wording: [],
      amount: []
    }
  }
  const encounteredIds = new Map<string, Operation>()

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i]

    // Vérifie la duplication de l'id
    if (encounteredIds.has(operation.operation.toString())) {
      addDuplicate(
        duplicateVerificationResult.duplicates.operation,
                encounteredIds.get(operation.operation.toString()) as Operation,
                operation
      )
    } else {
      encounteredIds.set(operation.operation.toString(), operation)
    }

    // Vérifie la duplication du wording si ce n'est pas la dernière opération
    if (i < operations.length - 1 && operation.wording === operations[i + 1].wording) {
      addDuplicate(duplicateVerificationResult.duplicates.wording, operation, operations[i + 1])
    }

    // Vérifie la duplication de l'amount si ce n'est pas la dernière opération
    if (i < operations.length - 1 && operation.amount === operations[i + 1].amount) {
      addDuplicate(duplicateVerificationResult.duplicates.amount, operation, operations[i + 1])
    }
  }

  return duplicateVerificationResult
}
