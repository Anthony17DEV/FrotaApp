import { View } from 'react-native'
import React from 'react'
import { external } from '@src/style/external.css'
import { commonStyles } from '@src/style/commonStyle.css'
import { useValues } from '@App'
import {
  TimerContainer,
  TopDealOffer,
  TrendingOffer,
  WatchBand,
} from '@src/components'
import { HeaderContainer } from '@src/commonComponents'
import { Heart, Search } from '@src/utils/icon'

export function OfferScreen() {
  const { bgFullStyle, iconColorStyle, t } = useValues()

  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <View style={[external.ph_20]}>
        <HeaderContainer
          value={t('transData.offers')}
          show={true}
          icon={<Heart />}
          iconTwo={<Search color={iconColorStyle} />}
        />
        <TimerContainer />
        <TrendingOffer />
      </View>
      <TopDealOffer />
      <WatchBand />
    </View>
  )
}
