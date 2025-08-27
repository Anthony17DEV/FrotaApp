import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { BannerContainer } from '../components/BannerContainer';
import { CarouselContainer } from '../components/CarouselContainer';
import { DealContainer } from '../components/DealContainer';
import { HeaderContainer } from '../components/HeaderContainer';
import { NewArrivalContainer } from '../components/NewArrivalContainer';
import { NewArrivalTwoContainer } from '../components/newArrivalTwoContainer';
import { ProductSwiper } from '../components/ProductSwiper';
import { TopBrandContainer } from '../components/TopBrandContainer';
import { TrendingContainer } from '../components/trendingContainer';
import { WhosTrending } from '../components/WhosTending';

export default function HomeScreen() {
	const openDrawer = () => {
		console.log('Abrir menu lateral');
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<HeaderContainer onPress={openDrawer} />

			<ScrollView
				showsVerticalScrollIndicator={false}
			>
				<BannerContainer />
				<ProductSwiper />
				<CarouselContainer />
				<NewArrivalContainer />
				<NewArrivalTwoContainer />
				<TrendingContainer />
				<WhosTrending />
				<DealContainer />
				<TopBrandContainer />

			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	placeholder: {
		padding: 20,
		alignItems: 'center',
	},
	placeholderText: {
		fontSize: 18,
		color: '#888',
	},
});
