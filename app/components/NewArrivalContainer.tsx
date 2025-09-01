import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { frotaplusService } from 'src/services/frotaplusService';

type Cartao = {
	numero: string;
	nomeCartao: string;
	situacao: string;
	saldo: number;
};

type CartaoMapeado = {
	id: string;
	img: { uri: string };
	title: string;
	subtitle: string;
};

const HeadingCategory = ({ value, seeall }: { value: string; seeall: string }) => (
	<View style={styles.headingContainer}>
		<Text style={styles.headingTitle}>{value}</Text>
		<TouchableOpacity>
			<Text style={styles.headingLink}>{seeall}</Text>
		</TouchableOpacity>
	</View>
);

export function NewArrivalContainer() {
	const [cartoes, setCartoes] = useState<CartaoMapeado[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const apiData: Cartao[] = await frotaplusService.getCartoes();

			if (Array.isArray(apiData)) {
				const dadosMapeados = apiData.map((item: Cartao) => ({
					id: item.numero,
					img: { uri: `https://placehold.co/100x100/e2e8f0/333?text=${item.situacao}` },
					title: item.nomeCartao,
					subtitle: `Saldo: R$ ${item.saldo.toFixed(2)} - Cartão: ...${item.numero.slice(-4)}`,
				}));
				setCartoes(dadosMapeados);
			} else {
				console.warn("A resposta da API não foi um array:", apiData);
				setCartoes([]);
			}
		} catch (e) {
			console.error("Erro completo ao buscar dados:", e);
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError('Ocorreu um erro desconhecido.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const renderItem = ({ item }: { item: CartaoMapeado }) => (
		<TouchableOpacity
			onPress={() => console.log('Selecionado:', item.title)}
			style={styles.itemContainer}
		>
			<Image source={item.img} style={styles.itemImage} />
			<View style={styles.itemDetails}>
				<Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
				<Text style={styles.itemSubtitle} numberOfLines={2}>{item.subtitle}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.wrapper}>
			<HeadingCategory value="Cartões" seeall="Ver todos" />

			{isLoading ? (
				<ActivityIndicator size="large" color="#0095DA" style={{ marginVertical: 40 }} />
			) : error ? (
				<View style={styles.centered}>
					<Text style={styles.errorText}>{error}</Text>
					<Button title="Tentar Novamente" onPress={fetchData} />
				</View>
			) : (
				<FlatList
					data={cartoes}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					scrollEnabled={false}
					ListEmptyComponent={<View style={styles.centered}><Text>Nenhum cartão encontrado.</Text></View>}
				/>
			)}
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
		width: 60,
		height: 60,
		borderRadius: 8,
		backgroundColor: '#f0f0f0',
	},
	itemDetails: {
		flex: 1,
		marginLeft: 15,
		justifyContent: 'center',
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	itemSubtitle: {
		fontSize: 14,
		color: '#888',
	},
	centered: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
	},
	errorText: {
		color: 'red',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 10,
	},
});

