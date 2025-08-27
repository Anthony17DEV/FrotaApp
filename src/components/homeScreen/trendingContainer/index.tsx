import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import React from 'react'
import { external } from '@src/style/external.css'
import { whatsTrendingData } from '@src/data/homeScreen'
import { commonStyles } from '@src/style/commonStyle.css'
import styles from './style.css'
import { windowWidth } from '@src/themes/appConstant'
import { useValues } from '@App'
import appColors from '@src/themes/appColors'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { HeadingCategory } from '@src/commonComponents'

interface TrendingContainerProps {
  isLoading: boolean
}

export function TrendingContainer({ isLoading }: TrendingContainerProps) {
  const { linearColorStyle, textColorStyle, isDark, t, currSymbol, currPrice } =
    useValues()
  const navigation = useNavigation<any>()
  const colors = isDark
    ? (['#3D3F45', '#45474B', '#2A2C32'] as const)
    : ([appColors.screenBg, appColors.screenBg] as const)

  const renderEmpty = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={appColors.primary} />
    }
    return (
      <Text style={[commonStyles.subtitleText, { textAlign: 'center' }]}>
        No Data Found
      </Text>
    )
  }

  return (
    <View>
      <View style={[external.mt_23, external.mh_20]}>
        <HeadingCategory
          value={t('transData.whatsTrending')}
          seeall={t('transData.seeAll')}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[external.ph_10]}
      >
        {whatsTrendingData.length > 0
          ? whatsTrendingData.map((item, index) => (
              <TouchableOpacity
                key={item.id.toString()}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ProductDetailOne')}
                style={{ marginRight: windowWidth(20) }}
              >
                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 0.0, y: 1.0 }}
                  colors={colors}
                  style={[
                    styles.container,
                    { shadowColor: appColors.shadowColor, borderRadius: 6 },
                  ]}
                >
                  <LinearGradient
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 0.0, y: 1.0 }}
                    colors={linearColorStyle}
                    style={[
                      styles.menuItemContent,
                      { shadowColor: appColors.shadowColor },
                    ]}
                  >
                    <View
                      style={[
                        styles.viewContainer,
                        { backgroundColor: item.bgColor },
                      ]}
                    >
                      <Image
                        style={styles.imgContainerView}
                        source={item.img}
                      />
                    </View>
                    <Text
                      style={[
                        commonStyles.titleText19,
                        { color: textColorStyle },
                      ]}
                    >
                      {t(item.title)}
                    </Text>
                    <Text style={[commonStyles.subtitleText]}>
                      {t(item.subtitle)}
                    </Text>
                    <View style={styles.priceContainer}>
                      <Text style={[styles.price, { color: textColorStyle }]}>
                        {currSymbol}
                        {(currPrice * item.price).toFixed(2)}
                      </Text>
                      <Text style={styles.underlinePrice}>
                        {currSymbol}
                        {(currPrice * item.underlinePrice).toFixed(2)}
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            ))
          : renderEmpty()}
      </ScrollView>
    </View>
  )
}
