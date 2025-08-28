import React from 'react';
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const trendingData = [
	{
		id: '1',
		img: { uri: 'https://placehold.co/150x100/e0f7fa/333?text=Servi%C3%A7o+A' },
		title: 'Alinhamento 3D',
		subtitle: 'Precisão Máxima',
		price: 150.0,
		underlinePrice: 180.0,
	},
	{
		id: '2',
		img: { uri: 'https://placehold.co/150x100/e0f7fa/333?text=Servi%C3%A7o+B' },
		title: 'Limpeza de Motor',
		subtitle: 'Performance Renovada',
		price: 220.0,
		underlinePrice: 250.0,
	},
	{
		id: '3',
		img: { uri: 'https://placehold.co/150x100/e0f7fa/333?text=Servi%C3%A7o+C' },
		title: 'Troca de Pneus',
		subtitle: 'Segurança em Primeiro Lugar',
		price: 450.0,
		underlinePrice: 500.0,
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

export function TrendingContainer() {
	const renderItem = ({ item }: { item: typeof trendingData[0] }) => (
		<TouchableOpacity
			onPress={() => console.log('Ver detalhes do serviço:', item.id)}
			style={styles.itemContainer}
		>
			<View style={styles.imageContainer}>
				<Image source={item.img} style={styles.itemImage} />
			</View>
			<View style={styles.detailsContainer}>
				<Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
				<Text style={styles.itemSubtitle} numberOfLines={1}>{item.subtitle}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.wrapper}>
			<HeadingCategory value="Serviços em Destaque" seeall="Ver todos" />
			<FlatList
				data={trendingData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: 20 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 25,
	},
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
		paddingHorizontal: 20,
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
		width: 160,
		backgroundColor: 'white',
		borderRadius: 10,
		marginRight: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	imageContainer: {
		backgroundColor: '#E0F7FA',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		alignItems: 'center',
		padding: 10,
	},
	itemImage: {
		width: 120,
		height: 80,
		resizeMode: 'contain',
	},
	detailsContainer: {
		padding: 10,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 2,
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
});
