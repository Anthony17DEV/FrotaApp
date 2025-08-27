import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

const dealData = [
	{
		img: { uri: 'https://placehold.co/200x140/e0f7fa/0077c2?text=Pneus' },
		title: 'Oferta de Pneus',
		price: 450.0,
	},
	{
		img: { uri: 'https://placehold.co/200x140/fff3e0/fe881a?text=Combust%C3%ADvel' },
		title: 'Desconto em Combustível',
		price: 6.5,
	},
	{
		img: { uri: 'https://placehold.co/200x140/f1f8e9/4caf50?text=Manuten%C3%A7%C3%A3o' },
		title: 'Revisão Preventiva',
		price: 250.0,
	},
];

export function DealContainer() {
	return (
		<View>
			<Text style={styles.mainTitle}>Ofertas do Dia</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{dealData.map((item, index) => (
					<View style={{ marginHorizontal: 5 }} key={index}>
						<ImageBackground
							resizeMode="cover"
							style={styles.imgStyle}
							source={item.img}
							imageStyle={{ borderRadius: 10 }}
						>
							<View style={styles.textOverlay}>
								<Text style={styles.textStyle}>{item.title}</Text>
								<Text style={styles.priceContainer}>
									R$ {item.price.toFixed(2)}
								</Text>
							</View>
						</ImageBackground>
					</View>
				))}
			</ScrollView>
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
		width: 200,
		height: 200,
		justifyContent: 'flex-end',
	},
	textOverlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.51)',
		padding: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	textStyle: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 14,
	},
	priceContainer: {
		color: '#FFFFFF',
		fontSize: 12,
	},
});
