import { Image, ImageSourcePropType, Text, View } from 'react-native'
import React, { FC } from 'react'
import { external } from '@src/style/external.css'
import { commonStyles } from '@src/style/commonStyle.css'
import { ThreeDot } from '../../assets/icons/threeDot'
import styles from './style.css'
import { useValues } from '@App'
import { LinearGradient } from 'expo-linear-gradient'
import appColors from '@src/themes/appColors'

interface PaymentScreenContainerProps {
  data: Array<{
    img: ImageSourcePropType
    title: string
    subtitle: string
  }>
}

export function PaymentScreenContainer({ data }: PaymentScreenContainerProps) {
  const {
    isDark,
    textColorStyle,
    linearColorStyle,
    textRTLStyle,
    viewRTLStyle,
    t,
  } = useValues()

  const colors: string[] = isDark
    ? (['#808184', '#2E3036'] as const)
    : ([appColors.screenBg, appColors.screenBg] as const)

  return (
    <View>
      {data?.map((item, index) => (
        <LinearGradient
          key={index}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={colors as [string, string]}
          style={[styles.container, { flexDirection: viewRTLStyle }]}
        >
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={[styles.menuItemContent, { flexDirection: viewRTLStyle }]}
          >
            <Image style={styles.img} source={item.img} />
            <View style={[external.mh_10, external.fg_1]}>
              <Text
                style={[
                  styles.titleText,
                  { color: textColorStyle },
                  { textAlign: textRTLStyle },
                ]}
              >
                {t(item.title)}
              </Text>
              <Text
                style={[commonStyles.subtitleText, { textAlign: textRTLStyle }]}
              >
                {t(item.subtitle)}
              </Text>
            </View>
            <ThreeDot />
          </LinearGradient>
        </LinearGradient>
      ))}
    </View>
  )
}
