import { Image, ImageSourcePropType, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Heart, Notification } from '@src/utils/icon'
import { external } from '@src/style/external.css'
import { commonStyles } from '@src/style/commonStyle.css'
import images from '@src/utils/images'
import appColors from '@src/themes/appColors'
import { NavigationButton, IconBackground } from '@src/commonComponents'
import styles from './style.css'
import { useValues } from '@App'

interface MyBegProps {
  navigation: {
    navigate: (screen: string) => void
    goBack: (screen: string) => void
  }
}

export function MyBeg({ navigation }: MyBegProps) {
  const { isDark, bgFullStyle, textColorStyle, t } = useValues()
  const colors: string[] = isDark
    ? ['#3D3F45', '#45474B', '#2A2C32']
    : [appColors.screenBg, appColors.screenBg]

  const darkmode: ImageSourcePropType = isDark ? images.darkBag : images.beg
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeScreen')
      return true
    }
  }, [navigation])

  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <View style={[styles.container]}>
        <View
          style={[external.ai_center, external.js_center, external.as_center]}
        >
          <Text
            style={[
              commonStyles.titleText19,
              external.ti_center,
              { color: textColorStyle, marginLeft: '30%' },
            ]}
          >
            {t('transData.myBeg')}
          </Text>
        </View>

        <View style={[external.mh_20]}>
          <IconBackground
            value={<Heart />}
            onPress={() => navigation.navigate('MyWhishList')}
          />
        </View>
        <IconBackground
          value={<Notification />}
          onPress={() => navigation.navigate('NotificationScreen')}
        />
      </View>
      <View style={styles.flexView}>
        <View>
          <Image style={styles.imgStyle} source={darkmode} />
          <Text style={[styles.bagIsEmptyText, { color: textColorStyle }]}>
            {t('transData.bagIsEmpty')}
          </Text>
          <Text style={styles.bagisEmptySomething}>
            {t('transData.bagIsEmptySomething')}
          </Text>
        </View>
        <View style={{ width: '100%' }}>
          <NavigationButton
            title={t('transData.startShopping')}
            backgroundColor={'#4D66FF'}
            color={appColors.screenBg}
            onPress={() => navigation.navigate('DrawerScreen')}
          />
        </View>
      </View>
    </View>
  )
}
