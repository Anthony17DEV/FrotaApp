import { BackHandler, View } from 'react-native'
import React, { useEffect } from 'react'
import { external } from '@src/style/external.css'
import { SearchContainer } from '@src/components/homeScreen/homeIndex'
import { commonStyles } from '@src/style/commonStyle.css'
import { useValues } from '@App'
import {
  ProductContainer,
  HeaderContainer,
} from '@src/components/categoryContainer/index'
import { useNavigation } from '@react-navigation/native'

export function CategoryScreen() {
  const { bgFullStyle } = useValues()
  const navigation = useNavigation<any>()

  useEffect(() => {
    const back = () => {
      console.log('function called')

      if (navigation.canGoBack()) {
        navigation.goBack()
      } else {
        navigation.navigate('Home')
      }
    }
  }, [navigation])

  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <View style={[external.pt_10]}>
        <HeaderContainer />
      </View>
      <SearchContainer />
      <ProductContainer />
    </View>
  )
}
