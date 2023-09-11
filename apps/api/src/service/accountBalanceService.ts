import { Operation } from '../type/types'

export const accountBalanceService = (operationData: Operation[]): number => {
  return operationData.reduce((accumulator, operation) => {
    return accumulator + operation.amount
  }, 0)
}
