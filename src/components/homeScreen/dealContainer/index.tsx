import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
  ScrollView,
} from 'react-native'
import React from 'react'
import styles from './style.css'
import { external } from '@src/style/external.css'
import { useValues } from '@App'
import { windowHeight } from '@src/themes/appConstant'

interface DealItem {
  img: ImageSourcePropType
  title: string
  price: number
}

interface DealContainerProps {
  data?: DealItem[]
  show?: boolean
  currSymbol?: string
  currPrice?: number | undefined | any
}

export function DealContainer({
  data,
  show,
  currSymbol,
  currPrice,
}: DealContainerProps) {
  const { t } = useValues()

  const renderItem = (item: DealItem) => (
    <View style={{ marginHorizontal: windowHeight(3) }} key={item.title}>
      <ImageBackground
        resizeMode="contain"
        style={styles.imgStyle}
        source={item.img}
      >
        {show ? (
          <View>
            <Text style={styles.textTwoStyle}>
              {item.title}
              <Text style={styles.priceContainerTwo}>{item.price}</Text>
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.textStyle}>{t(item.title)}</Text>
            <Text style={styles.priceContainer}>
              {currSymbol}
              {(currPrice * item.price).toFixed(2)}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  )

  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={[external.mh_10]}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        {data?.map(item => renderItem(item))}
      </ScrollView>
    </View>
  )
}
