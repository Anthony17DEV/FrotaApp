import { FlatList, Image, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import appColors from '@src/themes/appColors'
import { otherReview } from '@src/data'
import { commonStyles } from '@src/style/commonStyle.css'
import { fontSizes } from '@src/themes/appConstant'
import { external } from '@src/style/external.css'
import { SolidLine } from '@src/commonComponents'
import { styles } from './styles.css'
import { useValues } from '@App'
import { LinearGradient } from 'expo-linear-gradient'

export function RatingScreenContainer() {
  const { linearColorStyle, linearColorStyleTwo, textColorStyle } = useValues()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const renderItem = ({ item }) => (
    <View>
      <View
        style={[
          external.ph_20,
          external.fd_row,
          external.ai_center,
          external.pv_15,
        ]}
      >
        <Image style={styles.img} source={item.img} />
        <View style={[external.ph_20]}>
          <Text
            style={[
              commonStyles.titleText19,
              { fontSize: fontSizes.FONT17 },
              { color: textColorStyle },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              commonStyles.titleText19,
              { fontSize: fontSizes.FONT17, color: appColors.subtitle },
            ]}
          >
            {item.hours}
          </Text>
          <Text style={[styles.subtitle, { color: textColorStyle }]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
      <View>
        <SolidLine />
      </View>
    </View>
  )

  return (
    <LinearGradient colors={linearColorStyleTwo} style={styles.container}>
      <LinearGradient colors={linearColorStyle} style={styles.containerTwo}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <Text style={styles.loaderText}>Loading...</Text>
            <ActivityIndicator size="large" color={appColors.primary} />
          </View>
        ) : (
          <FlatList
            data={otherReview}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        )}
      </LinearGradient>
    </LinearGradient>
  )
}
