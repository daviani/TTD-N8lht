import React, { useEffect, useState } from 'react'
import { GiTeapotLeaves } from 'react-icons/gi'
import { StyleSheet, Text } from 'react-native'
import { useKey } from 'react-use'
import { utilities } from '../../tailwind.config'
import { deleteClientOperation, getCheckAccount } from '../api/clientApi'
import CardContainer from '../components/CardContainer'
import DuplicateCard from '../components/client/DuplicateCard'
import NotificationPopup from '../components/NotificationPopup'
import PageContainer from '../components/PageContainer'
import { texts } from '../texts'
import { CheckAccount } from '../types/types'
import { emptyCheckAccountResponse } from '../Utils'

const CheckAccountScreen = ({ route }) => {
  const { slug } = route.params
  const [validationData, setValidationData] = useState<CheckAccount>(emptyCheckAccountResponse)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useKey(slug, () => {
    setValidationData(emptyCheckAccountResponse)
  })
  useEffect(() => {
    const fetchCheckAccount = async () => {
      try {
        const response = await getCheckAccount(slug)

        setValidationData(response.data)
        setSuccessMessage(texts.message.success.clientCheck)
      } catch {
        setErrorMessage(texts.message.error.clientCheck)
      }
    }

    fetchCheckAccount().then(() => console.log('ok'))
  }, [slug])

  const getColor = () => {
    if (validationData.data.message.startsWith('202')) {
      return utilities.theme.colors.success
    } else if (validationData.data.message.startsWith('418')) {
      return utilities.theme.colors.error
    }
  }

  const isDuplicateFound = validationData.data.duplicateVerification.duplicates.operation ||
        validationData.data.duplicateVerification.duplicates.wording ||
        validationData.data.duplicateVerification.duplicates.amount

  const handleDeleteOperations = async (operationId: string) => {
    try {
      await deleteClientOperation(slug, operationId)

      const updateAccount = await getCheckAccount(slug)
      setValidationData(updateAccount.data)
    } catch {
      console.error('Error deleting card:')
    }
  }
  const operation = validationData.data.duplicateVerification.duplicates.operation
  const wording = validationData.data.duplicateVerification.duplicates.wording
  const amount = validationData.data.duplicateVerification.duplicates.amount

  const showSuccessMessage = !!successMessage
  const showError = !!errorMessage

  return (
        <PageContainer>
            {showSuccessMessage && (

                <>
                    {validationData.data.message.startsWith('418') ? <GiTeapotLeaves size={46}/> : null}
                    <CardContainer color={getColor()} height={75}>
                        <Text style={styles.title}>{validationData.data.message}</Text>
                    </CardContainer>

                    {
                        validationData.data.isNegativeBalance
                          ? <CardContainer color={utilities.theme.colors.error} height={75}>
                                <Text style={styles.title}>
                                    Solde négatif: {validationData.data.balance} $
                                </Text>
                            </CardContainer>
                          : <CardContainer color={utilities.theme.colors.primary} height={75}>
                                <Text style={styles.title}>
                                    Actual Sold: {validationData.data.balance} $
                                </Text>
                            </CardContainer>
                    }

                    {isDuplicateFound && (
                        <>
                            {operation.length > 0 && (
                                <>
                                    <CardContainer color={utilities.theme.colors.error} height={75}>
                                        <Text style={styles.title}>Duplication d'opération</Text>
                                    </CardContainer>
                                    <DuplicateCard subject={operation} onUpdateValidationData={handleDeleteOperations}/>
                                </>
                            )}

                            {wording.length > 0 && (
                                <>
                                    <CardContainer color={utilities.theme.colors.error} height={75}>
                                        <Text style={styles.title}>Duplication sur le wording proche</Text>
                                    </CardContainer>
                                    <DuplicateCard subject={wording} onUpdateValidationData={handleDeleteOperations}/>
                                </>
                            )}

                            {amount.length > 0 && (
                                <>
                                    <CardContainer color={utilities.theme.colors.error} height={75}>
                                        <Text style={styles.title}>Duplication de montant proche</Text>
                                    </CardContainer>
                                    <DuplicateCard subject={amount} onUpdateValidationData={handleDeleteOperations}/>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
            {showError && <NotificationPopup type="error" message={errorMessage}/>}
        </PageContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: utilities.theme.colors.secondary
  }

})

export default CheckAccountScreen
