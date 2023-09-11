import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import slugify from 'lodash'
import React, { useEffect, useState } from 'react'
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { utilities } from '../../tailwind.config'
import { getClientsNames } from '../api/clientApi'
import CardContainer from '../components/CardContainer'
import NotificationPopup from '../components/NotificationPopup'
import PageContainer from '../components/PageContainer'
import { texts } from '../texts'
import { RootStackParamList } from '../types/types'

type ClientsScreenProps = StackNavigationProp<RootStackParamList, 'Clients'>;
const ClientsScreen = () => {
  const [clientsNames, setClientsNames] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadClientsNames = async () => {
      try {
        const names = await getClientsNames()
        setClientsNames(names.data.data)
        setSuccessMessage(texts.message.success.clients)
      } catch {
        setErrorMessage(texts.message.error.clients)
      }
    }

    loadClientsNames().then(() => console.log('ok'))
  }, [])

  const showSuccessMessage = !!successMessage
  const showError = !!errorMessage

  const navigation = useNavigation()

  const handleClientItemClick = (uuid: string) => {
    const slug = slugify(uuid)
    // @ts-ignore
    navigation.navigate<ClientsScreenProps>('ClientDetails', { slug })
  }

  return (
        <PageContainer>
            <Text style={styles.title}>{texts.client.title}</Text>

            {showSuccessMessage && (
                <>
                    <NotificationPopup type="success" message={successMessage}/>
                    <FlatList
                        data={clientsNames}
                        keyExtractor={(item) => item.uuid}
                        renderItem={({ item }) => (
                            <CardContainer color={utilities.theme.colors.info} height={75}>
                                <TouchableOpacity
                                    onPress={() => handleClientItemClick(item.uuid)}
                                >
                                    <Text style={styles.text}>{item.clientId}</Text>
                                </TouchableOpacity>
                            </CardContainer>

                        )}
                    />
                </>
            )}
            {showError && <NotificationPopup type="error" message={errorMessage}/>}
        </PageContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 24
  },
  text: {
    textAlign: 'center',
    color: utilities.theme.colors.secondary,
    fontSize: 16
  }
})

export default ClientsScreen
