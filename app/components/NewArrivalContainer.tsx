import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { frotaplusService } from 'src/services/frotaplusService';

const icons = {
	gasolina: require('../../assets/images/gasoline-pump.png'),
	diesel: require('../../assets/images/diesel.png'),
	etanol: require('../../assets/images/ethanol.png'),
	lavagem: require('../../assets/images/car-service.png'),
	gnv: require('../../assets/images/bottle.png'),
	padrao: require('../../assets/images/transaction.png'),
};

type Transacao = {
	CodigoCompra: number;
	NumeroCartao: string;
	NomeClienteCartao: string;
	DataCompra: string;
	NomeFantasiaLoja: string;
	ValorTotalCompra: number;
	DescricaoProduto: string;
};

type TransacaoMapeada = {
	id: string;
	img: ImageSourcePropType;
	title: string;
	subtitle: string;
	value: string;
};

const categoryData = [
	{ id: 0, title: 'Todos' },
	{ id: 1, title: 'Gasolina' },
	{ id: 2, title: 'Diesel' },
	{ id: 3, title: 'Lavagem' },
	{ id: 4, title: 'Etanol' },
	{ id: 5, title: 'GNV' },
];

const getIconForProduct = (productDescription: string): ImageSourcePropType => {
	if (productDescription) {
		const lowerCaseDesc = productDescription.toLowerCase();
		if (lowerCaseDesc.includes('gasolina')) return icons.gasolina;
		if (lowerCaseDesc.includes('diesel')) return icons.diesel;
		if (lowerCaseDesc.includes('etanol')) return icons.etanol;
		if (lowerCaseDesc.includes('lavagem')) return icons.lavagem;
		if (lowerCaseDesc.includes('gnv')) return icons.gnv;
	}
	return icons.padrao;
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
	const [allTransactions, setAllTransactions] = useState<Transacao[]>([]);
	const [displayedTransactions, setDisplayedTransactions] = useState<TransacaoMapeada[]>([]);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState('Todos');
	const [isRefreshing, setIsRefreshing] = useState(false);

	const fetchData = async () => {
		if (!isRefreshing) setIsLoading(true);
		setError(null);
		setAllTransactions([]);
		try {
			const hoje = new Date().toISOString().split('T')[0];
			const trintaDiasAtras = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

			const apiData: any = await frotaplusService.getTransacoes({
				dataInicial: trintaDiasAtras,
				dataFinal: hoje,
				tipoProduto: '',
			});
			const transacoesArray = apiData.data || apiData;

			if (Array.isArray(transacoesArray)) {
				setAllTransactions(transacoesArray);
			} else {
				setAllTransactions([]);
			}
		} catch (e) {
			if (e instanceof Error) { setError(e.message); }
			else { setError('Ocorreu um erro desconhecido.'); }
		} finally {
			if (!isRefreshing) setIsLoading(false);
		}
	};

	const handleRefresh = useCallback(async () => {
		setIsRefreshing(true);
		await fetchData();
		setIsRefreshing(false);
	}, []);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		let filteredData = allTransactions;

		if (selectedCategory !== 'Todos') {
			filteredData = allTransactions.filter(transacao => {
				if (transacao.DescricaoProduto && typeof transacao.DescricaoProduto === 'string') {
					return transacao.DescricaoProduto.toLowerCase().includes(selectedCategory.toLowerCase());
				}
				return false;
			});
		}

		const ultimasCinco = filteredData
			.sort((a, b) => new Date(b.DataCompra).getTime() - new Date(a.DataCompra).getTime())
			.slice(0, 5);

		const dadosMapeados = ultimasCinco.map((item: Transacao) => {
			const dataObj = new Date(item.DataCompra);
			const dataFormatada = !isNaN(dataObj.getTime())
				? dataObj.toLocaleDateString('pt-BR', {
					day: '2-digit', month: '2-digit', year: '2-digit'
				})
				: item.DataCompra.split('T')[0];

			return {
				id: String(item.CodigoCompra),
				img: getIconForProduct(item.DescricaoProduto),
				title: item.NomeFantasiaLoja,
				subtitle: `${item.NomeClienteCartao} • ${item.DescricaoProduto || 'Serviço'} • ${dataFormatada}`,
				value: `- R$ ${item.ValorTotalCompra.toFixed(2).replace('.', ',')}`,
			};
		});

		setDisplayedTransactions(dadosMapeados);

	}, [selectedCategory, allTransactions]);

	const renderItem = ({ item }: { item: TransacaoMapeada }) => (
		<TouchableOpacity style={styles.itemContainer}>
			<Image source={item.img} style={styles.itemImage} />
			<View style={styles.itemDetails}>
				<Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
				<Text style={styles.itemSubtitle} numberOfLines={1}>{item.subtitle}</Text>
			</View>
			<Text style={styles.itemValue}>{item.value}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.wrapper}>
			<HeadingCategory value="Últimas Transações" seeall="Ver todas" />

			<View style={styles.swiperWrapper}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{categoryData.map(item => (
						<TouchableOpacity
							key={item.id}
							onPress={() => setSelectedCategory(item.title)}
							style={[
								styles.swiperItemContainer,
								item.title === selectedCategory && styles.swiperSelectedItemContainer,
							]}
						>
							<Text style={[
								styles.swiperItemText,
								item.title === selectedCategory && styles.swiperSelectedItemText,
							]}>
								{item.title}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			{isLoading ? (
				<ActivityIndicator size="large" color="#0095DA" style={{ marginVertical: 40 }} />
			) : error ? (
				<View style={styles.centered}>
					<Text style={styles.errorText}>{error}</Text>
					<Button title="Tentar Novamente" onPress={fetchData} />
				</View>
			) : (
				<FlatList
					data={displayedTransactions}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					scrollEnabled={false}
					ListEmptyComponent={<View style={styles.centered}><Text>Nenhuma transação encontrada.</Text></View>}
					onRefresh={handleRefresh}
					refreshing={isRefreshing}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: { marginTop: 25, paddingHorizontal: 20 },
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 5,
	},
	headingTitle: { fontSize: 20, fontWeight: 'bold' },
	headingLink: { fontSize: 14, color: '#0095DA' },

	swiperWrapper: {
		marginTop: 10,
		marginBottom: 20,
	},
	swiperItemContainer: {
		paddingBottom: 5,
		marginRight: 25,
	},
	swiperSelectedItemContainer: {
		borderBottomWidth: 2,
		borderBottomColor: '#0095DA',
	},
	swiperItemText: {
		fontSize: 16,
		color: '#888',
	},
	swiperSelectedItemText: {
		color: '#0095DA',
		fontWeight: 'bold',
	},

	itemContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 12, marginBottom: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
	itemImage: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0' },
	itemDetails: { flex: 1, marginLeft: 15, justifyContent: 'center' },
	itemTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
	itemSubtitle: { fontSize: 13, color: '#888' },
	itemValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },

	centered: { justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
	errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginBottom: 10 },
});