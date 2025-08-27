import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const newArrivalData = [
	{
		id: '1',
		img: { uri: 'https://atrialub.com.br/wp-content/uploads/2018/11/catalogo_fundo_lust.jpg' },
		title: 'Troca de óleo Agendada',
		subtitle: 'Veículo: ABC-1234',
		price: 150.0,
	},
	{
		id: '2',
		img: { uri: 'https://fandistribuidora.com.br/wp-content/uploads/2022/02/2.jpg' },
		title: 'Abastecimento Completo',
		subtitle: 'Posto Parceiro XYZ',
		price: 350.0,
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
	const router = useRouter();

	const renderItem = ({ item }: { item: typeof newArrivalData[0] }) => (
		<TouchableOpacity
			onPress={() => console.log('Navegar para detalhes do item', item.id)}
			activeOpacity={0.9}
			style={styles.itemWrapper}
		>
			<LinearGradient
				colors={['#FFFFFF', '#F9F9F9']}
				style={styles.container}
			>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={item.img} />
				</View>
				<View style={styles.textContainer}>
					<View style={styles.ratingContainer}>
						<Text style={styles.title} numberOfLines={1}>{item.title}</Text>
					</View>
					<Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
					<View style={styles.priceContainer}>
						<Text style={styles.price}>
							R$ {item.price.toFixed(2)}
						</Text>
					</View>
				</View>
			</LinearGradient>
		</TouchableOpacity>
	);

	return (
		<View style={styles.newArrivalContainer}>
			<HeadingCategory value="Últimos Serviços" seeall="Ver Todos" />
			<FlatList
				data={newArrivalData}
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
	newArrivalContainer: {
		marginTop: 20,
	},
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	headingTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	headingLink: {
		fontSize: 14,
		color: '#0095DA',
	},
	itemWrapper: {
		marginRight: 15,
	},
	container: {
		width: 280,
		flexDirection: 'row',
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#EDF0FF',
	},
	imageContainer: {
		height: 120,
		width: 120,
		backgroundColor: '#F3F5FB',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '80%',
		height: '80%',
		resizeMode: 'contain',
	},
	textContainer: {
		flex: 1,
		marginLeft: 10,
		justifyContent: 'space-between',
	},
	title: {
		width: '75%',
		color: '#000',
		fontSize: 16,
		fontWeight: 'bold',
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	subtitle: {
		color: '#888',
		fontSize: 12,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
	},
	price: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000',
	},
	underlinePrice: {
		marginLeft: 5,
		color: '#AAA',
		textDecorationLine: 'line-through',
	},
	plusButton: {
		marginLeft: 'auto',
		backgroundColor: '#0095DA',
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
