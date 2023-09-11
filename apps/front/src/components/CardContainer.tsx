import React from 'react'
import { Dimensions, View } from 'react-native'

const CardContainer = ({ children, height, color }) => {
  const { width } = Dimensions.get('window')
  const cardStyles = {
    backgroundColor: color,
    padding: 25,
    borderRadius: 5,
    marginBottom: 10,
    height,
    width: width * 0.75
  }

  return (
        <View style={cardStyles}>{children}</View>
  )
}

export default CardContainer
