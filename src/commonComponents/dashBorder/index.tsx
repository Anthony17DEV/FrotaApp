import React from 'react'
import { View } from 'react-native'
import styles from './style.css'
import { useValues } from '@App'

export function DashedBorderComponent() {
  const { isDark } = useValues()
  const solidLine = isDark ? '#4b4c59' : '#ECEEF2'
  return (
    <View style={styles.separator}>
      <View style={[styles.separatorLine, { borderColor: solidLine }]} />
    </View>
  )
}
