import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, Button, StyleSheet } from 'react-native'
import { utilities } from '../../tailwind.config'
import PageContainer from '../components/PageContainer'
import { texts } from '../texts'
import { RootStackParamList } from '../types/types'

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenProp>()
  return (<PageContainer>
        <Text style={styles.title}>{texts.home.title}</Text>
        <Button
            title={texts.home.client}
            color={utilities.theme.colors.info}
            onPress={() => navigation.navigate('Clients')}
        />
    </PageContainer>)
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25
  }
})

export default HomeScreen
