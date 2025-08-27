import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const whatsTrendingData = [
	{
		id: '1',
		img: { uri: 'https://placehold.co/100x50/e2e8f0/e2e8f0' },
		bgColor: '#E0F7FA',
		title: 'Alinhamento e Balanceamento',
		subtitle: 'Manutenção Preventiva',
		price: 120.0,
		underlinePrice: 140.0,
	},
	{
		id: '2',
		img: { uri: 'https://placehold.co/100x50/e2e8f0/e2e8f0' },
		bgColor: '#FFF3E0',
		title: 'Troca de Filtro de Ar',
		subtitle: 'Melhora de Performance',
		price: 80.0,
		underlinePrice: 95.0,
	},
	{
		id: '3',
		img: { uri: 'https://placehold.co/100x50/e2e8f0/e2e8f0' },
		bgColor: '#F1F8E9',
		title: 'Limpeza de Bicos',
		subtitle: 'Economia de Combustível',
		price: 180.0,
		underlinePrice: 200.0,
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
	const router = useRouter();
	const isLoading = false;

	const renderEmpty = () => {
		if (isLoading) {
			return <ActivityIndicator size="large" color="#0095DA" />;
		}
		return (
			<Text style={{ textAlign: 'center', color: '#888' }}>
				Nenhum serviço encontrado
			</Text>
		);
	};

	return (
		<View>
			<View style={styles.header}>
				<HeadingCategory value="Serviços em Destaque" seeall="Ver Todos" />
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 10 }}
			>
				{whatsTrendingData.length > 0
					? whatsTrendingData.map((item) => (
						<TouchableOpacity
							key={item.id}
							activeOpacity={0.9}
							onPress={() => console.log('Navegar para detalhes do serviço', item.id)}
							style={{ marginRight: 20 }}
						>
							<LinearGradient
								colors={['#FFFFFF', '#F9F9F9']}
								style={styles.container}
							>
								<View style={[styles.imageWrapper, { backgroundColor: item.bgColor }]}>
									<Image style={styles.image} source={item.img} />
								</View>
								<Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
								<Text style={styles.itemSubtitle} numberOfLines={1}>{item.subtitle}</Text>
								<View style={styles.priceContainer}>
									<Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
									<Text style={styles.underlinePrice}>R$ {item.underlinePrice.toFixed(2)}</Text>
								</View>
							</LinearGradient>
						</TouchableOpacity>
					))
					: renderEmpty()}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		marginTop: 23,
		marginHorizontal: 20,
	},
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headingTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	headingLink: {
		fontSize: 14,
		color: '#0095DA',
	},
	container: {
		width: 190,
		marginTop: 10,
		borderRadius: 9,
		padding: 10,
		elevation: 2,
		borderColor: '#EDF0FF',
		borderWidth: 0.5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	imageWrapper: {
		borderRadius: 7,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 6,
		marginBottom: 5,
	},
	image: {
		width: 95,
		height: 142,
		resizeMode: 'contain',
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000',
	},
	itemSubtitle: {
		fontSize: 12,
		color: '#888',
	},
	priceContainer: {
		marginTop: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	price: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000',
	},
	underlinePrice: {
		fontSize: 12,
		color: '#AAA',
		marginLeft: 5,
		textDecorationLine: 'line-through',
	},
});
