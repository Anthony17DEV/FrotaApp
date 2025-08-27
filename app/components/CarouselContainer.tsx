import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const carouselData = [
	{
		img: { uri: 'https://placehold.co/350x160/0077c2/FFFFFF?text=Promo+1' },
		title: 'Super Oferta',
		subtitle: 'Até 50% OFF',
		shopNow: 'Compre Agora',
	},
	{
		img: { uri: 'https://placehold.co/350x160/fe881a/FFFFFF?text=Promo+2' },
		title: 'Desconto Especial',
		subtitle: 'Pneus e Manutenção',
		shopNow: 'Aproveitar',
	},
	{
		img: { uri: 'https://placehold.co/350x160/4caf50/FFFFFF?text=Promo+3' },
		title: 'Ofertas Limitadas',
		subtitle: 'Combustível e Mais',
		shopNow: 'Ver Detalhes',
	},
];

export function CarouselContainer() {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<View>
			<Text style={styles.mainTitle}>Destaques</Text>

			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={(e) => {
					const x = e.nativeEvent.contentOffset.x;
					const index = Math.round(x / 350);
					setCurrentIndex(index);
				}}
				scrollEventThrottle={16}
			>
				{carouselData.map((item, index) => (
					<View style={{ marginRight: 10 }} key={index}>
						<ImageBackground
							resizeMode="cover"
							style={styles.imgStyle}
							source={item.img}
							imageStyle={{ borderRadius: 10 }}
						>
							<View style={styles.textOverlay}>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.subtitle}>{item.subtitle}</Text>
								<TouchableOpacity>
									<Text style={styles.shopNow}>{item.shopNow}</Text>
								</TouchableOpacity>
							</View>
						</ImageBackground>
					</View>
				))}
			</ScrollView>

			<View style={styles.pagination}>
				{carouselData.map((_, index) => (
					<View
						key={index}
						style={[
							styles.dot,
							currentIndex === index && styles.activeDot,
						]}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginHorizontal: 20,
		marginBottom: 10,
	},
	imgStyle: {
		width: 350,
		height: 160,
		justifyContent: 'flex-end',
	},
	textOverlay: {
		backgroundColor: 'rgba(0,0,0,0.45)',
		padding: 12,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	title: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16,
	},
	subtitle: {
		color: '#FFF',
		fontSize: 14,
	},
	shopNow: {
		color: '#FFD700',
		marginTop: 6,
		textDecorationLine: 'underline',
	},
	pagination: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 8,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#ccc',
		marginHorizontal: 4,
	},
	activeDot: {
		backgroundColor: '#0077c2',
		width: 10,
		height: 10,
	},
});
