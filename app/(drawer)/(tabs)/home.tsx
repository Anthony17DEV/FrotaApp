import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { BannerContainer } from '../../components/BannerContainer';
import { CategorySwiper } from '../../components/CategorySwiper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { HomeBanner } from '../../components/HomeBanner';
import { NewArrivalContainer } from '../../components/NewArrivalContainer';
import { TrendingContainer } from '../../components/TrendingContainer';

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<ScrollView
				showsVerticalScrollIndicator={false}
			>
				<HeaderContainer />
				<BannerContainer />
				<HomeBanner />
				<CategorySwiper />
				<NewArrivalContainer />
				<TrendingContainer />

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
