import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { homeProductData } from '../../../data/homeProductData'
import { external } from '@src/style/external.css'
import { commonStyles } from '@src/style/commonStyle.css'
import styles from './style.css'
import appColors from '@src/themes/appColors'
import { useValues } from '@App'

export function SwiperProduct() {
  const { isDark } = useValues()
  const [selectedItem, setSelectedItem] = useState(0)
  const { t } = useValues()

  const renderItem = (item: any) => (
    <TouchableOpacity
      onPress={() => setSelectedItem(item.id)}
      style={[
        external.mh_15,
        item.id === selectedItem ? styles.selectedMenuItemText : null,
      ]}
      key={item.id}
    >
      <Text
        style={[
          commonStyles.subtitleText,
          {
            color:
              item.id === selectedItem
                ? appColors.titleText
                : appColors.subtitle,
          },
          isDark && {
            color:
              item.id === selectedItem
                ? appColors.screenBg
                : appColors.subtitle,
          },
        ]}
      >
        {t(item.title)}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={[external.mh_20]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
      >
        {homeProductData.map(item => renderItem(item))}
      </ScrollView>
    </View>
  )
}
