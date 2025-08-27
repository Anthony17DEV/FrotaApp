import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { external } from '@src/style/external.css'
import { commonStyles } from '@src/style/commonStyle.css'
import appColors from '@src/themes/appColors'
import { useValues } from '@App'
import { styles } from './styles.css'
import { SearchContainer, HeaderContainer } from '@src/components'
import { LinearGradient } from 'expo-linear-gradient'
import { categoryDetailTwo, filterScreenData } from '@src/data'
import { CategoryDetailScreen } from '@components/index'
import { BackLeft, Notification } from '@src/utils/icon'
import { IconBackground } from '@src/commonComponents'
import { useNavigation } from '@react-navigation/native'
import { fontSizes, windowHeight } from '@src/themes/appConstant'

export function CategoryTwo() {
  const navigation = useNavigation<any>()
  const adjustDataForNumber = (data, number) => {
    const adjustedData = [...data]
    adjustedData.forEach(item => {
      item.id = (item.id + number) % adjustedData.length
    })
    adjustedData.sort((a, b) => a.id - b.id)

    return adjustedData
  }
  const [selectedItem, setSelectedItem] = useState(0)
  const { isRTL, isDark, viewRTLStyle, t } = useValues()
  const colorBg = isDark ? appColors.bgLayout : appColors.layoutBg
  const colorBgDark = isDark ? appColors.blackBg : appColors.screenBg
  const colorText = isDark ? appColors.titleText : appColors.lightButton
  const colorTextDark = isDark ? appColors.screenBg : appColors.primary

  const borderwidth = isRTL ? 2 : null
  const { bgFullStyle, linearColorStyle } = useValues()
  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <View style={[external.pt_10]}>
        {/* <HeaderContainer /> */}
        <View style={{ paddingHorizontal: windowHeight(13) }}>
          <View
            style={[
              external.fd_row,
              external.ai_center,
              { flexDirection: viewRTLStyle },
            ]}
          >
            <Text
              style={[
                commonStyles.titleText19,
                external.ti_center,
                external.fg_1,
                {
                  color: isDark ? 'white' : 'black',
                  fontSize: fontSizes.FONT21,
                  marginLeft: windowHeight(30),
                },
              ]}
            >
              {t('transData.categories')}
            </Text>
            <TouchableOpacity>
              <IconBackground
                onPress={() => navigation.navigate('NotificationScreen')}
                value={<Notification />}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SearchContainer />
      <View style={[styles.content, { flexDirection: viewRTLStyle }]}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyle}
          style={[styles.menuColumn, { backgroundColor: colorBg }]}
        >
          {filterScreenData.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedItem(item.id)}
                  style={[
                    styles.menuItem,
                    item.id === selectedItem ? styles.selectedMenuItem : null,
                    item.id === selectedItem && { borderRightColor: colorText },
                    item.id === selectedItem && {
                      borderLeftWidth: borderwidth,
                    },
                    item.id === selectedItem && {
                      backgroundColor: colorBgDark,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.menuItemText,
                      item.id === selectedItem
                        ? styles.menuItemTextSelect
                        : null,
                      item.id === selectedItem && { color: colorTextDark },
                    ]}
                  >
                    {t(item.title)}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </LinearGradient>
        <View>
          <CategoryDetailScreen
            data={adjustDataForNumber(categoryDetailTwo, selectedItem)}
            number={selectedItem}
          />
        </View>
      </View>
    </View>
  )
}
