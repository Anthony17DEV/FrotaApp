import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyles } from '@src/style/commonStyle.css'
import { homeProductData } from '@src/data'
import { external } from '@src/style/external.css'
import styles from './style'
import { useValues } from '@App'
import { SolidLine } from '@src/commonComponents'

export function ProductSwiper() {
  const [selectedItem, setSelectedItem] = useState(0)
  const { isRTL, t } = useValues()

  const renderItem = (item: any) => (
    <TouchableOpacity
      style={[
        styles.container,
        item.id === selectedItem ? styles.selectedMenuItem : null,
      ]}
      onPress={() => setSelectedItem(item.id)}
    >
      <Text
        style={[
          commonStyles.subtitleText,
          item.id === selectedItem ? styles.selectedMenuItemText : null,
        ]}
      >
        {t(item.title)}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={[external.mh_20, external.mt_15]}>
      <SolidLine />
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
        {homeProductData.map(item => (
          <View key={item.id}>{renderItem(item)}</View>
        ))}
      </View>
      <SolidLine />
    </View>
  )
}
