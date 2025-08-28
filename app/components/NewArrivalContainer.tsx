import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados de exemplo para "Serviços Recentes"
const newArrivalData = [
	{
		id: '1',
		img: { uri: 'https://placehold.co/100x100/e2e8f0/333?text=Servi%C3%A7o+1' },
		title: 'Informação 1',
		subtitle: 'Aqui ficaram as informações sobre a frota em especifica',
	},
	{
		id: '2',
		img: { uri: 'https://placehold.co/100x100/e2e8f0/333?text=Servi%C3%A7o+2' },
		title: 'Informação 2',
		subtitle: 'Aqui ficaram as informações sobre a frota em especifica',
	},
	{
		id: '3',
		img: { uri: 'https://placehold.co/100x100/e2e8f0/333?text=Servi%C3%A7o+3' },
		title: 'Informação 3',
		subtitle: 'Aqui ficaram as informações sobre a frota em especifica',
	},
];

const HeadingCategory = ({ value, seeall }: { value: string; seeall: string }) => (
	<View style={styles.headingContainer}>
		<Text style={styles.headingTitle}>{value}</Text>
		<TouchableOpacity>
			<Text style={styles.headingLink}>{seeall}</Text>
		</TouchableOpacity>
	</View>
);

export function NewArrivalContainer() {
	const renderItem = ({ item }: { item: typeof newArrivalData[0] }) => (
		<TouchableOpacity
			onPress={() => console.log('Ver detalhes do serviço:', item.id)}
			style={styles.itemContainer}
		>
			<Image source={item.img} style={styles.itemImage} />
			<View style={styles.itemDetails}>
				<Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
				<Text style={styles.itemSubtitle} numberOfLines={1}>{item.subtitle}</Text>
			</View>
			<View style={styles.ratingAndAddContainer}>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.wrapper}>
			<HeadingCategory value="Serviços Recentes" seeall="Ver todos" />
			<FlatList
				data={newArrivalData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				scrollEnabled={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 25,
		paddingHorizontal: 20,
	},
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	headingTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	headingLink: {
		fontSize: 14,
		color: '#0095DA',
	},
	itemContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		marginBottom: 15,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	itemImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
		backgroundColor: '#f0f0f0',
	},
	itemDetails: {
		flex: 1,
		marginLeft: 10,
		justifyContent: 'center',
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	itemSubtitle: {
		fontSize: 12,
		color: '#888',
		marginBottom: 8,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemPrice: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000',
	},
	itemUnderlinePrice: {
		fontSize: 12,
		color: '#AAA',
		textDecorationLine: 'line-through',
		marginLeft: 5,
	},
	ratingAndAddContainer: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		height: '100%',
		paddingVertical: 4, // Adiciona um pequeno espaçamento vertical
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	ratingText: {
		marginLeft: 4,
		color: '#FFA500',
		fontWeight: 'bold',
	},
	addButton: {
		backgroundColor: '#0095DA',
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
