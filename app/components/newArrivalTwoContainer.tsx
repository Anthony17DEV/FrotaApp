import React from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const newArrivalData = [
	{
		id: 1,
		img: { uri: 'https://placehold.co/200x120/0077c2/FFFFFF?text=Produto+1' },
		title: 'Produto Novo',
		subtitle: 'Linha Especial',
		price: 120.5,
		rating: 4.5,
	},
	{
		id: 2,
		img: { uri: 'https://placehold.co/200x120/fe881a/FFFFFF?text=Produto+2' },
		title: 'Lançamento',
		subtitle: 'Edição Limitada',
		price: 250.0,
		rating: 4.8,
	},
	{
		id: 3,
		img: { uri: 'https://placehold.co/200x120/4caf50/FFFFFF?text=Produto+3' },
		title: 'Novidade',
		subtitle: 'Coleção Atual',
		price: 99.99,
		rating: 4.2,
	},
];

export function NewArrivalTwoContainer() {
	return (
		<View>
			<Text style={styles.mainTitle}>Novidades</Text>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{newArrivalData.map((item) => (
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.card}
						key={item.id}
						onPress={() => console.log('Abrir produto:', item.id)}
					>
						<Image source={item.img} style={styles.img} />
						<View style={styles.infoContainer}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.subtitle}>{item.subtitle}</Text>
							<Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
						</View>
					</TouchableOpacity>
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
	card: {
		width: 200,
		marginRight: 12,
		backgroundColor: '#fff',
		borderRadius: 10,
		overflow: 'hidden',
		elevation: 2,
	},
	img: {
		width: '100%',
		height: 120,
		resizeMode: 'cover',
	},
	infoContainer: {
		padding: 10,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 12,
		color: '#555',
		marginBottom: 4,
	},
	price: {
		fontSize: 14,
		color: '#0077c2',
		fontWeight: 'bold',
	},
	rating: {
		fontSize: 12,
		color: '#FB9927',
		marginTop: 4,
	},
});
