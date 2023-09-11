import axios from 'axios'
import { texts } from '../texts'
import { CONSTANTS } from '../Utils'

export const getClientsNames = async () => {
  const url = `${CONSTANTS.GLOBAL_API_URL}/${CONSTANTS.CLIENTS}/${CONSTANTS.NAME_URL}`
  const response = await axios.get(url)

  if (response.status === 200) {
    return response
  } else {
    throw new Error(texts.api.errorNames)
  }
}

export const getClientDetails = async (clientId: string) => {
  const url = `${CONSTANTS.GLOBAL_API_URL}/${CONSTANTS.CLIENT}/${clientId}`
  const response = await axios.get(url)

  if (response.status === 200) {
    return response
  } else {
    throw new Error(texts.api.errorClientDetails)
  }
}

export const getCheckAccount = async (clientId: string) => {
  const url = `${CONSTANTS.GLOBAL_API_URL}/${CONSTANTS.CHECK_ACCOUNT_URL}/${clientId}`
  const response = await axios.get(url)

  if (response.status === 202) {
    return response
  } else {
    throw new Error(texts.api.errorCheckAccount)
  }
}

export const deleteClientOperation = async (clientId: string, operationId: string) => {
  const url = `${CONSTANTS.GLOBAL_API_URL}/${CONSTANTS.CLIENT}/${clientId}/${CONSTANTS.OPERATION}/${operationId}`
  const response = await axios.delete(url)

  if (response.status === 204) {
    return response.status
  } else {
    throw new Error(texts.api.errorDeleteOperation)
  }
}
