import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native'
import React from 'react'
import { FullHeader, PlusIcon } from '@src/commonComponents'
import { external } from '@src/style/external.css'
import { Notification } from '@src/utils/icon'
import { categoryDetailData } from '@src/data/homeScreenTwo'
import { SearchContainer } from '@src/components'
import { windowWidth } from '@src/themes/appConstant'
import { useValues } from '@App'
import { SortContainer } from '@src/components/categoryContainer'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { YellowStar } from '@src/assets/icons/yellowStar'
import { commonStyles } from '@src/style/commonStyle.css'
import styles from './styles'

export function CategoryDetail() {
  const navigation = useNavigation<any>()
  const {
    bgFullStyle,
    textColorStyle,
    linearColorStyle,
    linearColorStyleTwo,
    isDark,
    textRTLStyle,
    viewRTLStyle,
    t,
    currSymbol,
    currPrice,
  } = useValues()

  const back = () => {
    navigation.pop(1)
  }

  const color: string = isDark ? '#000' : '#F3F5FB'

  const renderEmpty = () => (
    <Text
      style={[
        commonStyles.subtitleText,
        { textAlign: 'center', marginTop: 20 },
      ]}
    >
      No Data Found
    </Text>
  )

  const renderItem = (item: {
    img: any
    title: string
    subtitle: string
    price: number
    rating: number
    id: number
  }) => (
    <View style={{ paddingHorizontal: windowWidth(12) }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ProductDetailOne', { id: item.id })}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyleTwo}
          style={[
            styles.viewContainer,
            { backgroundColor: bgFullStyle },
            { width: windowWidth(205) },
          ]}
        >
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            colors={linearColorStyle}
            style={styles.menuItemContent}
          >
            <View style={[styles.imgContainer, { backgroundColor: color }]}>
              <Image style={styles.img} source={item.img} />
            </View>
            <View style={styles.plusICon}>
              <PlusIcon />
            </View>
            <View style={[external.ph_10, external.pt_10]}>
              <Text
                style={[
                  commonStyles.titleText19,
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
              <View
                style={[
                  external.fd_row,
                  external.ai_center,
                  { flexDirection: viewRTLStyle },
                ]}
              >
                <View style={[external.fg_1]}>
                  <Text
                    style={[
                      commonStyles.H1Banner,
                      { color: textColorStyle },
                      { textAlign: textRTLStyle },
                      { fontFamily: 'semiBold' },
                    ]}
                  >
                    {currSymbol}
                    {(currPrice * item.price).toFixed(2)}
                  </Text>
                </View>
                <View
                  style={[
                    external.fd_row,
                    external.ai_center,
                    { flexDirection: viewRTLStyle },
                  ]}
                >
                  <YellowStar />
                  <Text style={styles.ratingContainer}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )

  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <View style={[external.mh_20]}>
        <FullHeader
          value={<Notification />}
          title={'Mobile & Accessories'}
          onpressBack={back}
          modelPress={() => navigation.navigate('NotificationScreen')}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[external.Pb_30]}
      >
        <SearchContainer />
        <SortContainer />
        <View
          style={{
            marginHorizontal: windowWidth(10),
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {categoryDetailData.length === 0
            ? renderEmpty()
            : categoryDetailData.map(item => renderItem(item))}
        </View>
      </ScrollView>
    </View>
  )
}
