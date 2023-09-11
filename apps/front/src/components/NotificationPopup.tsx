import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { utilities } from '../../tailwind.config'

const NotificationPopup = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1300)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const getPopupStyle = () => {
    switch (type) {
      case 'error':
        return styles.errorPopup
      case 'success':
        return styles.successPopup
      default:
        return styles.defaultPopup
    }
  }

  return isVisible
    ? (
            <View style={[styles.container, getPopupStyle()]}>
                <Text style={styles.messageText}>{message}</Text>
            </View>
      )
    : null
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    zIndex: 9999
  },
  defaultPopup: {
    backgroundColor: utilities.theme.colors.primary
  },
  errorPopup: {
    backgroundColor: utilities.theme.colors.error
  },
  successPopup: {
    backgroundColor: utilities.theme.colors.success
  },
  infoPopup: {
    backgroundColor: utilities.theme.colors.info
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: utilities.theme.colors.secondary
  }
})

export default NotificationPopup
