import { TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { external } from '@src/style/external.css'
import { commonStyles } from '@src/style/commonStyle.css'
import { Filter, Search } from '@src/utils/icon'
import styles from './style.css'
import appColors from '@src/themes/appColors'
import { LinearGradient } from 'expo-linear-gradient'
import { useValues } from '@App'
import { useNavigation } from '@react-navigation/native'

interface SearchContainerProps {
  show?: boolean
}

export function SearchContainer({ show }: SearchContainerProps) {
  const {
    linearColorStyle,
    linearColorStyleTwo,
    textRTLStyle,
    viewRTLStyle,
    t,
  } = useValues()
  const navigation = useNavigation<any>()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('CategoryDetail')}>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={linearColorStyleTwo}
        style={[styles.container, { flexDirection: viewRTLStyle }]}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyle}
          style={[styles.menuItemContent, { flexDirection: viewRTLStyle }]}
        >
          <View
            style={[styles.searchContainer, { flexDirection: viewRTLStyle }]}
          >
            <Search />
            <TextInput
              placeholder={t('transData.search')}
              placeholderTextColor={appColors.subtitle}
              style={[
                external.ph_5,
                commonStyles.subtitleText,
                { textAlign: textRTLStyle },
                styles.aa,
              ]}
            />
          </View>
          <View style={styles.containerView}>
            {show && (
              <View style={styles.filterStyle}>
                <View style={[external.mh_20]}>
                  <Filter />
                </View>
              </View>
            )}
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  )
}
