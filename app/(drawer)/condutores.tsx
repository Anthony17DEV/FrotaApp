import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { frotaplusService } from 'src/services/frotaplusService';

type Condutor = {
	nomeCartao: string;
	cpf: string;
	numero: string;
	situacao: 'A' | 'I' | 'B';
	saldo: number;
};

const CondutorListItem = ({ item, onEdit }: { item: Condutor; onEdit: (condutor: Condutor) => void; }) => {
	let situacaoTexto = 'INATIVO';
	if (item.situacao === 'A') situacaoTexto = 'ATIVO';
	if (item.situacao === 'B') situacaoTexto = 'BLOQUEADO';

	return (
		<View style={styles.cardContainer}>
			<View style={styles.cardHeader}>
				<Text style={styles.cardTitle}>{item.nomeCartao}</Text>
				<View style={[styles.statusBadge, item.situacao === 'A' ? styles.statusAtivo : styles.statusInativo]}>
					<Text style={[styles.statusText, item.situacao === 'A' ? styles.statusTextAtivo : styles.statusTextInativo]}>{situacaoTexto}</Text>
				</View>
			</View>

			<View style={styles.cardBody}>
				<View style={styles.cardRow}>
					<Text style={styles.cardLabel}>CPF:</Text>
					<Text style={styles.cardValue}>{item.cpf}</Text>
				</View>
				<View style={styles.cardRow}>
					<Text style={styles.cardLabel}>Cartão:</Text>
					<Text style={styles.cardValue}>{item.numero}</Text>
				</View>
				<View style={styles.cardRow}>
					<Text style={styles.cardLabel}>Saldo:</Text>
					<Text style={styles.cardValue}>R$ {item.saldo.toFixed(2).replace('.', ',')}</Text>
				</View>
			</View>

			<View style={styles.cardActions}>
				<TouchableOpacity style={styles.actionButton} onPress={() => onEdit(item)}>
					<Text style={styles.actionIcon}>✏️</Text>
					<Text style={styles.actionButtonText}>Editar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default function CondutoresScreen() {
	const router = useRouter();
	const [allCondutores, setAllCondutores] = useState<Condutor[]>([]);
	const [displayedCondutores, setDisplayedCondutores] = useState<Condutor[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [nome, setNome] = useState('');
	const [cpf, setCpf] = useState('');

	useEffect(() => {
		const fetchInitialData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await frotaplusService.getCondutores({});

				if (response.error) {
					setError(response.error);
				} else if (Array.isArray(response)) {
					setAllCondutores(response);
					setDisplayedCondutores(response);
				}
			} catch (e) {
				if (e instanceof Error) setError(e.message);
				else setError('Ocorreu um erro desconhecido');
			} finally {
				setIsLoading(false);
			}
		};
		fetchInitialData();
	}, []);

	const handleSearch = () => {
		const searchNome = nome.trim().toLowerCase();
		const searchCpf = cpf.trim().replace(/\D/g, '');

		if (!searchNome && !searchCpf) {
			setDisplayedCondutores(allCondutores);
			return;
		}

		const filtered = allCondutores.filter(condutor => {
			const matchNome = searchNome ? (condutor.nomeCartao || '').toLowerCase().includes(searchNome) : true;
			const matchCpf = searchCpf ? (condutor.cpf || '').replace(/\D/g, '').includes(searchCpf) : true;
			return matchNome && matchCpf;
		});

		setDisplayedCondutores(filtered);
	};

	const handleInsert = () => {
		router.push('/form-condutor');
	};

	const handleEdit = (condutor: Condutor) => {
		router.push({
			pathname: '/form-condutor',
			params: { ...condutor }
		});
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<View style={styles.container}>
				<View style={styles.filterContainer}>
					<Text style={styles.filterTitle}>Filtro de Busca</Text>
					<TextInput style={styles.input} placeholder="Nome do Condutor" value={nome} onChangeText={setNome} />
					<TextInput style={[styles.input, { marginTop: 10 }]} placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={[styles.button, styles.searchButton]} onPress={handleSearch}><Text style={styles.buttonText}>Buscar</Text></TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.insertButton]} onPress={handleInsert}><Text style={styles.buttonText}>Inserir</Text></TouchableOpacity>
				</View>

				{isLoading ? (
					<ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />
				) : error ? (
					<Text style={styles.errorText}>{error}</Text>
				) : (
					<FlatList
						data={displayedCondutores}
						renderItem={({ item }) => <CondutorListItem item={item} onEdit={handleEdit} />}
						keyExtractor={(item) => item.numero}
						ListEmptyComponent={<Text style={styles.emptyText}>Nenhum condutor encontrado.</Text>}
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
	input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 12, fontSize: 16, backgroundColor: '#ffffffff' },
	buttonsContainer: { flexDirection: 'row', marginBottom: 20 },
	button: { flex: 1, padding: 12, borderRadius: 5, alignItems: 'center', marginRight: 10 },
	searchButton: { backgroundColor: '#3498db' },
	insertButton: { backgroundColor: '#2ecc71' },
	buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
	cardContainer: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
	cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
	cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1 },
	cardBody: { marginBottom: 15 },
	cardRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
	cardLabel: { fontSize: 14, color: '#888' },
	cardValue: { fontSize: 14, color: '#333', fontWeight: '500' },
	cardActions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, justifyContent: 'flex-end' },
	actionButton: { flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
	actionButtonText: { marginLeft: 5, color: '#555' },
	actionIcon: { fontSize: 18 },
	statusBadge: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 12 },
	statusAtivo: { backgroundColor: '#d4edda' },
	statusInativo: { backgroundColor: '#f8d7da' },
	statusText: { fontSize: 11, fontWeight: 'bold' },
	statusTextAtivo: { color: '#155724' },
	statusTextInativo: { color: '#721c24' },
	emptyText: { textAlign: 'center', marginTop: 30, color: '#888' },
	errorText: { textAlign: 'center', marginTop: 30, color: 'red' },
});