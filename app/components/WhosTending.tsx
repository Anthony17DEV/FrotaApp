import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const trendingData = [
	{
		id: 1,
		img: { uri: 'https://placehold.co/60x60/0077c2/FFFFFF?text=🔥' },
		title: 'Tênis Esportivo',
		subtitle: 'Conforto e Estilo',
		price: 299.9,
		fullPrice: 399.9,
	},
	{
		id: 2,
		img: { uri: 'https://placehold.co/60x60/fe881a/FFFFFF?text=⭐' },
		title: 'Headphone Pro',
		subtitle: 'Som de Qualidade',
		price: 499.0,
		fullPrice: 650.0,
	},
	{
		id: 3,
		img: { uri: 'https://placehold.co/60x60/4caf50/FFFFFF?text=🔥' },
		title: 'Smartwatch',
		subtitle: 'Tecnologia no pulso',
		price: 699.0,
		fullPrice: 850.0,
	},
];

export function WhosTrending() {
	return (
		<View style={styles.container}>
			<Text style={styles.mainTitle}>🔥 What's Trending</Text>

			{trendingData.map((item, index) => (
				<View key={item.id} style={styles.row}>
					<Image source={item.img} style={styles.img} />
					<View style={styles.info}>
						<View style={styles.row}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.oldPrice}>R$ {item.fullPrice.toFixed(2)}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.subtitle}>{item.subtitle}</Text>
							<Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
						</View>
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		marginTop: 20,
		backgroundColor: '#fff',
		borderRadius: 8,
		elevation: 2,
		padding: 12,
	},
	mainTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	img: {
		width: 60,
		height: 60,
		borderRadius: 6,
	},
	info: {
		flex: 1,
		marginLeft: 10,
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
		flex: 1,
	},
	subtitle: {
		fontSize: 12,
		color: '#666',
		flex: 1,
	},
	price: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#0077c2',
	},
	oldPrice: {
		fontSize: 12,
		color: '#999',
		textDecorationLine: 'line-through',
		marginLeft: 8,
	},
});
