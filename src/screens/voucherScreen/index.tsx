import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonStyles } from '@src/style/commonStyle.css'
import { apply, myCoupon, off } from '@src/constant'
import { external } from '@src/style/external.css'
import { voucherData } from '@src/data'
import { windowHeight } from '@src/themes/appConstant'
import appColors from '@src/themes/appColors'
import styles from './style.css'
import { useValues } from '@App'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@src/navigation/type'
import { HeaderContainer } from '@src/commonComponents'

export function VoucherScreen() {
  const navigation = useNavigation<any>()
  const { bgFullStyle, isDark, textColorStyle } = useValues()
  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <View style={[external.ph_20]}>
        <HeaderContainer value={myCoupon} />
      </View>
      {voucherData.map((item, index) => (
        <View key={index}>
          <ImageBackground
            style={styles.img}
            source={isDark ? item.imgDark : item.img}
          >
            <Text
              style={[
                styles.offText,
                {
                  color: item.textColor
                    ? appColors.bgLayer
                    : appColors.subtitle,
                },
              ]}
            >
              {item.off}
              <Text
                style={[
                  commonStyles.titleText19,
                  {
                    color: item.textColor
                      ? appColors.bgLayer
                      : appColors.subtitle,
                  },
                ]}
              >
                {off}
              </Text>
            </Text>
            <View style={styles.viewText}>
              <View style={styles.viewTitleText}>
                <Text style={[styles.viewTitleText, { color: textColorStyle }]}>
                  {item.title}
                </Text>
                <View style={{ marginRight: windowHeight(23) }}>
                  {item.icon}
                </View>
              </View>
              <View style={[external.fd_row, external.ai_center]}>
                <Text style={styles.subtitleText}>
                  {item.subtitle}
                  {''}
                  <Text
                    style={{
                      color: item.textColor
                        ? textColorStyle
                        : appColors.subtitle,
                    }}
                  >
                    {item.voucherCode}
                  </Text>
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text
                    style={[
                      styles.applyText,
                      {
                        color: item.textColor
                          ? appColors.primary
                          : appColors.subtitle,
                      },
                    ]}
                  >
                    {apply}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      ))}
    </View>
  )
}
