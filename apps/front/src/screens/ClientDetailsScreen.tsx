import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { format } from 'date-fns'
import slugify from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { utilities } from '../../tailwind.config'
import { getClientDetails } from '../api/clientApi'
import CardContainer from '../components/CardContainer'
import NotificationPopup from '../components/NotificationPopup'
import PageContainer from '../components/PageContainer'
import { texts } from '../texts'
import { ClientDetails, RootStackParamList } from '../types/types'
import { emptyClientDetailsResponse } from '../Utils'

type ClientDetailsScreenProps = StackNavigationProp<RootStackParamList, 'ClientDetails'>;
const ClientDetailsScreen = ({ route }) => {
  const { slug } = route.params
  const [clientDetails, setClientDetails] = useState<ClientDetails>(emptyClientDetailsResponse)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await getClientDetails(slug)
        setClientDetails(response.data)
        setSuccessMessage(texts.message.success.clientDetails)
      } catch {
        setErrorMessage(texts.message.error.clientDetails)
      }
    }

    fetchClientDetails().then(() => console.log('ok'))
  }, [])

  const navigation = useNavigation()

  const handleCheckAccountClick = (clientId: string) => {
    const slug = slugify(clientId)

    // @ts-ignore
    navigation.navigate<ClientDetailsScreenProps>('CheckAccount', { slug })
  }

  const lastOperation = clientDetails.data.operations[clientDetails.data.operations.length - 1]

  const lastOperationDate = lastOperation ? format(new Date(lastOperation.date), 'dd/MM/yyyy') : ''
  const lastOperationWording = lastOperation ? lastOperation.wording : ''
  const lastOperationAmount = lastOperation ? lastOperation.amount.toFixed(2) : ''

  const lastBalance = clientDetails.data.balances && clientDetails.data.balances.length > 0
    ? clientDetails.data.balances[clientDetails.data.balances.length - 1]
    : null

  const lastBalanceDate = lastBalance
    ? format(new Date(lastBalance.date), 'dd/MM/yyyy')
    : null

  const lastBalanceAmount = lastBalance
    ? lastBalance.balance.toFixed(2)
    : null

  const showSuccessMessage = !!successMessage
  const showError = !!errorMessage

  return (

        <PageContainer>
            {showSuccessMessage && (
                <>
                    <CardContainer color={utilities.theme.colors.primary} height={75}>
                        <Text style={styles.title}>Client: {clientDetails.data.clientId}</Text>
                    </CardContainer>
                    <CardContainer color={utilities.theme.colors.primary} height={150}>
                        <Text style={styles.title}>Operations:</Text>
                        <Text style={styles.text}>Date: {lastOperationDate}</Text>
                        <Text style={styles.text}>Wording: {lastOperationWording}</Text>
                        <Text style={styles.text}>Amount: {lastOperationAmount} $</Text>
                    </CardContainer>

                    <CardContainer color={utilities.theme.colors.primary} height={150}>
                        <Text style={styles.title}>Balance:</Text>
                        <Text style={styles.text}>Date: {lastBalanceDate}</Text>
                        <Text style={styles.text}>Amount: {lastBalanceAmount} $</Text>
                    </CardContainer>
                    <CardContainer color={utilities.theme.colors.info} height={75}>
                        <TouchableOpacity
                            onPress={() => handleCheckAccountClick(clientDetails.data.uuid)}
                        >
                            <Text style={styles.title}>Verify Error</Text>
                        </TouchableOpacity>
                    </CardContainer>
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
    marginBottom: 25,
    color: utilities.theme.colors.secondary
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
    color: utilities.theme.colors.secondary,
    backgroundColor: utilities.theme.colors.primary
  }

})
export default ClientDetailsScreen
