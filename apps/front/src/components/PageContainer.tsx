import React from 'react'
import { View, StyleSheet } from 'react-native'
import { PageContainerProps } from '../types/types'

const PageContainer: React.FC<PageContainerProps> = ({ children }) => (

    <View style={styles.container}>{children}</View>

)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PageContainer
