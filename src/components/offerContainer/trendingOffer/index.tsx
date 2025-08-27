import React from 'react'
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native'
import images from '@src/utils/images'
import { external } from '@src/style/external.css'
import { grabToday } from '@src/constant'
import { styles } from './style.css'
import { commonStyles } from '@src/style/commonStyle.css'
import { TrendingAnimation } from '../trendignAnimation'
import { LeftSideArrow } from '@src/utils/icon'
import { fontSizes } from '@src/themes/appConstant'
import { useValues } from '@App'
import { HeadingCategory } from '@src/commonComponents'

export function TrendingOffer() {
  const { t } = useValues()
  return (
    <View style={[external.mt_20]}>
      <HeadingCategory value={t('transData.trendigOffers')} />
      <ImageBackground
        resizeMode="stretch"
        style={styles.imageBackground}
        source={images.sliderBg}
      >
        <Text style={[styles.text, external.ph_20]}>
          20 % off <Text style={styles.subText}>in Headphones & Airpods</Text>
        </Text>
        <Text style={[styles.subTitleText, external.ph_20]}>{grabToday}</Text>
        <TouchableOpacity style={[styles.shopButton]}>
          <Text
            style={[
              commonStyles.titleText19,
              external.ph_5,
              { fontSize: fontSizes.FONT16 },
            ]}
          >
            {t('transData.showNow')}
          </Text>
          <LeftSideArrow />
        </TouchableOpacity>
      </ImageBackground>
      <TrendingAnimation />
    </View>
  )
}
