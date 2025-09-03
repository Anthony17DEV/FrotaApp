import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { frotaplusService } from 'src/services/frotaplusService';

type Estabelecimento = {
	codigo: string;
	nomeFantasia: string;
	CNPJ: string;
	cidade: string;
	UF: string;
	fone1: string;
	razaoSocial?: string;
};

const EstabelecimentoListItem = ({ item }: { item: Estabelecimento }) => (
	<View style={styles.cardContainer}>
		<View style={styles.cardHeader}>
			<Text style={styles.cardTitle} numberOfLines={1}>{item.nomeFantasia}</Text>
		</View>
		<View style={styles.cardBody}>
			<Text style={styles.cardText}><Text style={styles.cardLabel}>Razão Social:</Text> {item.razaoSocial || 'Não informado'}</Text>
			<Text style={styles.cardText}><Text style={styles.cardLabel}>CNPJ:</Text> {item.CNPJ}</Text>
			<Text style={styles.cardText}><Text style={styles.cardLabel}>Local:</Text> {item.cidade} - {item.UF}</Text>
			<Text style={styles.cardText}><Text style={styles.cardLabel}>Telefone:</Text> {item.fone1}</Text>
		</View>
	</View>
);

export default function EstabelecimentosScreen() {
	const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [nome, setNome] = useState('');
	const [cidade, setCidade] = useState('');

	const handleSearch = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await frotaplusService.getEstabelecimentos({ nome, cidade });

			if (response.error) {
				setError(response.error);
				setEstabelecimentos([]);
			} else if (Array.isArray(response)) {
				setEstabelecimentos(response);
			} else {
				setEstabelecimentos([]);
			}
		} catch (e) {
			if (e instanceof Error) setError(e.message);
			else setError('Ocorreu um erro desconhecido');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleSearch();
	}, []);

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<View style={styles.container}>
				<View style={styles.filterContainer}>
					<Text style={styles.filterTitle}>Filtro de Busca</Text>
					<TextInput style={styles.input} placeholder="Nome Fantasia ou Razão Social" value={nome} onChangeText={setNome} />
					<TextInput style={[styles.input, { marginTop: 10 }]} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={[styles.button, styles.searchButton]} onPress={handleSearch}>
						<Text style={styles.buttonText}>Buscar</Text>
					</TouchableOpacity>
				</View>

				{isLoading ? (
					<ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />
				) : error ? (
					<Text style={styles.errorText}>{error}</Text>
				) : (
					<FlatList
						data={estabelecimentos}
						renderItem={({ item }) => <EstabelecimentoListItem item={item} />}
						keyExtractor={(item) => item.codigo}
						ListEmptyComponent={<Text style={styles.emptyText}>Nenhum estabelecimento encontrado.</Text>}
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
	input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 12, fontSize: 16, backgroundColor: '#fafafa' },
	buttonsContainer: { flexDirection: 'row', marginBottom: 20 },
	button: { flex: 1, padding: 12, borderRadius: 5, alignItems: 'center' },
	searchButton: { backgroundColor: '#3498db' },
	buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
	cardContainer: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
	cardHeader: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10, marginBottom: 10 },
	cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
	cardBody: {},
	cardText: { fontSize: 14, color: '#555', marginBottom: 5 },
	cardLabel: { fontWeight: 'bold', color: '#333' },
	emptyText: { textAlign: 'center', marginTop: 30, color: '#888' },
	errorText: { textAlign: 'center', marginTop: 30, color: 'red' },
});