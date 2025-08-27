import { BackHandler, ScrollView, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './style.css'
import { newArrivalSmallData } from '@src/data/homeScreen/newArrivalData'
import { external } from '@src/style/external.css'
import { dealData } from '@src/data/homeScreen'
import { justWatchedData } from '@src/data/homeScreenTwo'
import { useValues } from '@App'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { windowHeight } from '@src/themes/appConstant'
import {
  SearchContainer,
  BannerContainer,
  HeaderContainer,
  ProductSwiper,
  NewArrivalContainer,
  TrendingContainer,
  DealContainer,
  TopBrandContainer,
} from '@src/components/homeScreen/homeIndex'
import { NewArrivalBigContainer } from '@src/components/homeScreenTwo/index'

export function HomeScreen() {
  const { bgFullStyle, t } = useValues()
  const navigation = useNavigation<any>()

  const openDrawer = () => {
    navigation.getParent()?.toggleDrawer()
  }

  return (
    <ScrollView
      contentContainerStyle={[external.Pb_80]}
      style={[styles.container, { backgroundColor: bgFullStyle }]}
      showsVerticalScrollIndicator={false}
    >
      <HeaderContainer onPress={openDrawer} />
      <SearchContainer show={true} />
      <BannerContainer />
      <ProductSwiper />
      <NewArrivalContainer
        data={newArrivalSmallData}
        value={t('transData.newArrival')}
        show={true}
        showPlus={true}
      />
      <TrendingContainer />
      <NewArrivalContainer
        data={newArrivalSmallData}
        value={t('transData.topRating')}
        show={true}
        showPlus={true}
      />
      <View style={{ marginTop: windowHeight(10) }}>
        <DealContainer data={dealData} />
      </View>
      <View style={{ marginHorizontal: windowHeight(0) }}>
        <NewArrivalBigContainer
          data={justWatchedData}
          width={170}
          value={t('transData.justWatcheds')}
          horizontal={true}
          show={true}
          style={{ left: windowHeight(8) }}
        />
      </View>
      <TopBrandContainer />
    </ScrollView>
  )
}
