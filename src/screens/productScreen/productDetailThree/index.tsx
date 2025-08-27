import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, FC } from 'react'
import { external } from '@src/style/external.css'
import { commonStyles } from '@src/style/commonStyle.css'
import styles from './style.css'
import appColors from '@src/themes/appColors'
import { fontSizes, windowHeight, windowWidth } from '@src/themes/appConstant'
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component'
import { Plus, RightSmallArrow } from '@src/utils/icon'
import { Cart } from '@src/assets/icons/cart'
import { SolidLine, BottomContainer } from '@src/commonComponents'
import { newArrivalBigData } from '@src/data'
import { useValues } from '@App'
import {
  SliderCarousel,
  ReviewScreen,
  KeyContainer,
  DetailText,
  DetailContainer,
  NewArrivalBigContainer,
  DeliverContainer,
} from '@src/components'

interface TableData {
  tableData: string[][]
  tableHead?: string[]
}

const tableData: TableData = {
  tableData: [
    ['Brands', 'Zebronics'],
    ['Model', 'ZEB-RETRO'],
    ['Driver Size', '40mm'],
    ['Dimensions', '181*181*89'],
    ['Sensitivity', '105±3 dB | Microphone:-58dB'],
    ['Frequency', '20hz to 20k hz'],
  ],
}

interface ProductDetailThreeProps {
  navigation: {
    navigate: (screen: string) => void
  }
}

export function ProductDetailThree({ navigation }: ProductDetailThreeProps) {
  const [data, setData] = useState<TableData>(tableData)
  const { bgFullStyle, textColorStyle } = useValues()

  return (
    <View
      style={[commonStyles.commonContainer, { backgroundColor: bgFullStyle }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: windowHeight(50) }}
      >
        <SliderCarousel />
        <DetailContainer />
        <DetailText />
        <View style={styles.container}>
          <Table
            style={{ borderRadius: 10, overflow: 'hidden' }}
            borderStyle={{ borderWidth: 1, borderColor: '#EDF0FF' }}
          >
            <Row
              data={data.tableHead}
              flexArr={[1, 1, 2]}
              textStyle={styles.text}
            />
            <TableWrapper>
              <Rows
                data={data.tableData}
                flexArr={[1, 2, 1]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </View>
        <DeliverContainer />
        <KeyContainer />
        <View style={[external.mh_20]}>
          <SolidLine />
          <View style={[external.fd_row, external.js_space]}>
            <Text style={[commonStyles.titleText19, { color: textColorStyle }]}>
              Reviews :
            </Text>
            <TouchableOpacity
              style={[external.fd_row, external.ai_center]}
              onPress={() => navigation.navigate('RatingScreen')}
            >
              <Text
                style={[
                  commonStyles.titleText19,
                  { fontSize: fontSizes.FONT17, color: textColorStyle },
                ]}
              >
                {'105 reviews'}
              </Text>
              <RightSmallArrow />
            </TouchableOpacity>
          </View>
          <SolidLine />
        </View>
        <ReviewScreen />
        <SolidLine />
        <Text style={styles.writeYourReview}>+ Write Your Review</Text>
        <NewArrivalBigContainer
          data={newArrivalBigData}
          horizontal={true}
          width={windowWidth(205)}
          style={{ left: windowHeight(8) }}
        />
      </ScrollView>
      <View style={styles.bottomContainerView}>
        <BottomContainer
          onPress={() => navigation.navigate('AddtocartOne')}
          leftValue={
            <View style={[external.fd_row, external.ai_center, external.mh_20]}>
              <View
                style={[external.mh_15, external.fd_row, external.ai_center]}
              >
                <Plus color={appColors.titleText} />
                <Text style={[styles.addToBeg, { color: textColorStyle }]}>
                  Add to Bag
                </Text>
              </View>
            </View>
          }
          value={
            <TouchableOpacity
              onPress={() => navigation.navigate('AddtocartOne')}
              style={[external.fd_row, external.ai_center, external.pt_4]}
            >
              <Cart />
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  )
}
