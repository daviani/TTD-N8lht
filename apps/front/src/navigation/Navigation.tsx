import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import CheckAccountScreen from '../screens/CheckAccountScreen'
import ClientDetailsScreen from '../screens/ClientDetailsScreen'
import ClientsScreen from '../screens/ClientsScreen'
import HomeScreen from '../screens/HomeScreen'
import { RootStackParamList } from '../types/types'

const Stack = createStackNavigator<RootStackParamList>()

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Clients" component={ClientsScreen}/>
            <Stack.Screen name="ClientDetails" component={ClientDetailsScreen}/>
            <Stack.Screen name="CheckAccount" component={CheckAccountScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigation
