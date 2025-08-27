import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FullHeader } from '@src/commonComponents'
import { clearAll, notification } from '@src/constant'
import { commonStyles } from '@src/style/commonStyle.css'
import { external } from '@src/style/external.css'
import { fontSizes } from '@src/themes/appConstant'
import { NotificationLayout } from '@src/components/notification/notificationLayout'
import { useValues } from '@App'

export function NotificationContainer() {
  const navigation = useNavigation()
  const { bgFullStyle } = useValues()

  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <View style={[external.mh_20]}>
        <FullHeader
          onpressBack={() => navigation.goBack()}
          show={true}
          title={notification}
          text={
            <Text
              style={[
                commonStyles.hederH2,
                { fontSize: fontSizes.FONT17, color: '#4D66FF' },
              ]}
            >
              {clearAll}
            </Text>
          }
        />
        <NotificationLayout />
      </View>
    </View>
  )
}
