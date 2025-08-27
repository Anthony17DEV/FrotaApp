import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { external } from '@src/style/external.css'
import { commonStyles } from '@src/style/commonStyle.css'
import { useValues } from '@App'
import styles from './style.css'
import { newArrivalData } from '@src/data'
import { NewArrivalContainer } from '@src/components/homeScreen/newArrivalContainer'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FullHeader } from '@src/commonComponents'

export function WhishlitContainer() {
  const { bgFullStyle, t } = useValues()
  const navigation = useNavigation<any>()
  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <View style={[external.mh_20]}>
        <FullHeader
          show={true}
          title={t('transData.myWishlistFive')}
          text={
            <Text style={styles.container}>{t('transData.removeAll')}</Text>
          }
          onpressBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[external.Pb_80]}
      >
        <NewArrivalContainer
          data={newArrivalData}
          show={false}
          showPlus={true}
        />
      </ScrollView>
    </View>
  )
}
