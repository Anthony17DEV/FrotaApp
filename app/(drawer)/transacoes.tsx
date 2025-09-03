import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { frotaplusService } from 'src/services/frotaplusService';

type Transacao = {
	CodigoCompra: number;
	Placa: string;
	ModeloVeiculo: string;
	NumeroCartao: string;
	NomeClienteCartao: string;
	CentroCusto: string;
	DataCompra: string;
	NomeFantasiaLoja: string;
	CidadeLoja: string;
	UfLoja: string;
	DescricaoProduto: string;
	KM: number;
	Litros: number;
	ValorTotalCompra: number;
};

const TransactionListItem = ({ item }: { item: Transacao }) => {
	const dataFormatada = new Date(item.DataCompra).toLocaleString('pt-BR', {
		day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
	});

	return (
		<View style={styles.cardContainer}>
			<View style={styles.cardHeader}>
				<Text style={styles.cardTitle} numberOfLines={1}>{item.NomeFantasiaLoja}</Text>
				<Text style={styles.cardValuePrincipal}>R$ {item.ValorTotalCompra.toFixed(2).replace('.', ',')}</Text>
			</View>

			<View style={styles.cardBody}>
				<Text style={styles.cardText}><Text style={styles.cardLabel}>Condutor:</Text> {item.NomeClienteCartao}</Text>
				<Text style={styles.cardText}><Text style={styles.cardLabel}>Placa:</Text> {item.Placa}</Text>
				<Text style={styles.cardText}><Text style={styles.cardLabel}>Produto:</Text> {item.DescricaoProduto}</Text>
				<Text style={styles.cardText}><Text style={styles.cardLabel}>Data:</Text> {dataFormatada}</Text>
			</View>
		</View>
	);
};

const formatDateToDDMMYYYY = (date: Date) => {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
};

const parseDateToYYYYMMDD = (dateString: string) => {
	const parts = dateString.split('/');
	if (parts.length === 3) {
		return `${parts[2]}-${parts[1]}-${parts[0]}`;
	}
	return dateString;
};

export default function TransacoesScreen() {
	const [allTransactions, setAllTransactions] = useState<Transacao[]>([]);
	const [displayedTransactions, setDisplayedTransactions] = useState<Transacao[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Estados para os filtros
	const [dataInicial, setDataInicial] = useState(formatDateToDDMMYYYY(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)));
	const [dataFinal, setDataFinal] = useState(formatDateToDDMMYYYY(new Date()));
	const [condutor, setCondutor] = useState('');
	const [placa, setPlaca] = useState('');
	const [lojista, setLojista] = useState('');

	useEffect(() => {
		handleSearch();
	}, []);

	const handleSearch = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await frotaplusService.getTransacoes({
				dataInicial: `${parseDateToYYYYMMDD(dataInicial)} 00:00:00`,
				dataFinal: `${parseDateToYYYYMMDD(dataFinal)} 23:59:59`,
				placa,
			});

			if (response.error) {
				setError(response.error);
				setAllTransactions([]);
				setDisplayedTransactions([]);
			} else if (Array.isArray(response.data)) {
				setAllTransactions(response.data);
				const searchCondutor = condutor.trim().toLowerCase();
				const searchLojista = lojista.trim().toLowerCase();

				const filtered = response.data.filter((transacao: Transacao) => {
					const matchCondutor = searchCondutor ? (transacao.NomeClienteCartao || '').toLowerCase().includes(searchCondutor) : true;
					const matchLojista = searchLojista ? (transacao.NomeFantasiaLoja || '').toLowerCase().includes(searchLojista) : true;
					return matchCondutor && matchLojista;
				});

				setDisplayedTransactions(filtered);
			} else {
				setAllTransactions([]);
				setDisplayedTransactions([]);
			}
		} catch (e) {
			if (e instanceof Error) setError(e.message);
			else setError('Ocorreu um erro desconhecido');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<View style={styles.container}>
				<View style={styles.filterContainer}>
					<Text style={styles.filterTitle}>Filtro de Busca</Text>
					<View style={styles.filterRow}>
						<TextInput style={[styles.input, { flex: 1, marginRight: 10 }]} placeholder="Data Inicial" value={dataInicial} onChangeText={setDataInicial} />
						<TextInput style={[styles.input, { flex: 1 }]} placeholder="Data Final" value={dataFinal} onChangeText={setDataFinal} />
					</View>
					<TextInput style={styles.input} placeholder="Condutor" value={condutor} onChangeText={setCondutor} />
					<TextInput style={styles.input} placeholder="Placa do veículo" value={placa} onChangeText={setPlaca} />
					<TextInput style={styles.input} placeholder="Lojista" value={lojista} onChangeText={setLojista} />
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={[styles.button, styles.searchButton]} onPress={handleSearch}><Text style={styles.buttonText}>Buscar</Text></TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.printButton]}><Text style={[styles.buttonText, { color: '#333' }]}>Imprimir</Text></TouchableOpacity>
				</View>

				{isLoading ? (
					<ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />
				) : error ? (
					<Text style={styles.errorText}>{error}</Text>
				) : (
					<FlatList
						data={displayedTransactions}
						renderItem={({ item }) => <TransactionListItem item={item} />}
						keyExtractor={(item) => item.CodigoCompra.toString()}
						ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma transação encontrada.</Text>}
						contentContainerStyle={{ paddingBottom: 20 }}
					/>
				)}
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
	filterContainer: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
	filterTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
	filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
	input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 12, fontSize: 16, backgroundColor: '#fafafa', marginBottom: 10 },
	buttonsContainer: { flexDirection: 'row', marginBottom: 20 },
	button: { flex: 1, padding: 12, borderRadius: 5, alignItems: 'center', marginRight: 10 },
	searchButton: { backgroundColor: '#3498db' },
	printButton: { backgroundColor: '#ecf0f1', borderWidth: 1, borderColor: '#bdc3c7' },
	buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
	cardContainer: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
	cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
	cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1 },
	cardValuePrincipal: { fontSize: 16, fontWeight: 'bold', color: '#27ae60' },
	cardBody: { paddingVertical: 5 },
	cardText: { fontSize: 14, color: '#555', marginBottom: 4 },
	cardLabel: { fontWeight: 'bold', color: '#333' },
	emptyText: { textAlign: 'center', marginTop: 30, color: '#888' },
	errorText: { textAlign: 'center', marginTop: 30, color: 'red' },
});