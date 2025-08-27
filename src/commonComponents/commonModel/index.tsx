import React, { FC } from 'react'
import { View, Modal } from 'react-native'
import { styles } from './style.css'
import { useValues } from '@App'

interface CommonModalProps {
  isVisible?: boolean
  value?: string | any
  animationType?: 'slide' | 'fade' | 'none'
  closeModal?: () => void | boolean
  title?: string
  subtitle?: string
}

export function CommonModal({
  isVisible,
  value,
  animationType,
  closeModal,
  title,
  subtitle,
}: CommonModalProps) {
  const { bgFullStyle } = useValues()
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType || 'slide'}
    >
      <View style={styles.container}>
        <View style={[styles.valueBar, { backgroundColor: bgFullStyle }]}>
          <View>{value}</View>
        </View>
      </View>
    </Modal>
  )
}
