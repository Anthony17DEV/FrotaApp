import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { frotaplusService } from 'src/services/frotaplusService';

type Vehicle = {
	placa: string;
	modelo: string;
	combustivel: string;
	situacao: 'A' | 'I';
	tipoFrota?: string;
};

const VehicleListItem = ({ item }: { item: Vehicle }) => {
	const situacaoTexto = item.situacao === 'A' ? 'ATIVO' : 'INATIVO';

	const getCombustivelAbreviado = (combustivel: string) => {
		const lower = combustivel.toLowerCase();
		if (lower.includes('diesel')) return 'D';
		if (lower.includes('gasolina')) return 'G';
		if (lower.includes('flex')) return 'F';
		if (lower.includes('etanol')) return 'E';
		return combustivel.charAt(0);
	};

	return (
		<View style={styles.row}>
			<Text style={[styles.cell, { flex: 1.5 }]}>{item.placa}</Text>
			<Text style={[styles.cell, { flex: 2 }]}>{item.modelo}</Text>
			<Text style={[styles.cell, { flex: 2 }]}>{item.combustivel}</Text>
			<View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
				<View style={[styles.statusBadge, item.situacao === 'A' ? styles.statusAtivo : styles.statusInativo]}>
					<Text style={[item.situacao === 'A' ? styles.statusTextAtivo : styles.statusTextInativo]}>{situacaoTexto}</Text>
				</View>
			</View>
			<View style={[styles.actionsCell, { flex: 1.2 }]}>
				<TouchableOpacity onPress={() => console.log('Editar:', item.placa)}><Text style={styles.actionIcon}>✏️</Text></TouchableOpacity>
				<TouchableOpacity onPress={() => console.log('Excluir:', item.placa)}><Text style={styles.actionIcon}>🗑️</Text></TouchableOpacity>
			</View>
		</View>
	);
};

export default function VehiclesScreen() {
	const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
	const [displayedVehicles, setDisplayedVehicles] = useState<Vehicle[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [placa, setPlaca] = useState('');
	const [tipo, setTipo] = useState('');
	const [modelo, setModelo] = useState('');

	useEffect(() => {
		const fetchInitialData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await frotaplusService.getVehicles({ placa: '' });

				if (response.error) {
					setError(response.error);
				} else if (Array.isArray(response)) {
					setAllVehicles(response);
					setDisplayedVehicles(response);
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
		const searchPlaca = placa.trim().toLowerCase();
		const searchTipo = tipo.trim().toLowerCase();
		const searchModelo = modelo.trim().toLowerCase();

		if (!searchPlaca && !searchTipo && !searchModelo) {
			setDisplayedVehicles(allVehicles);
			return;
		}

		const filtered = allVehicles.filter(vehicle => {
			const matchPlaca = searchPlaca ? vehicle.placa.toLowerCase().startsWith(searchPlaca) : true;
			const matchTipo = searchTipo ? (vehicle.tipoFrota || '').toLowerCase().includes(searchTipo) : true;
			const matchModelo = searchModelo ? (vehicle.modelo || '').toLowerCase().includes(searchModelo) : true;

			return matchPlaca && matchTipo && matchModelo;
		});

		setDisplayedVehicles(filtered);
	};

	const handleInsert = () => {
		console.log('Abrir tela de cadastro de veículo');
	};

	return (
		<View style={styles.container}>
			<View style={styles.filterContainer}>
				<Text style={styles.filterTitle}>Filtro de Busca</Text>
				<View style={styles.filterRow}>
					<TextInput style={[styles.input, { flex: 1, marginRight: 10 }]} placeholder="Placa" value={placa} onChangeText={setPlaca} />
					<TextInput style={[styles.input, { flex: 1 }]} placeholder="Tipo" value={tipo} onChangeText={setTipo} />
				</View>
				<TextInput style={[styles.input, { width: '100%', marginTop: 10 }]} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
			</View>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={[styles.button, styles.searchButton]} onPress={handleSearch}><Text style={styles.buttonText}>Buscar</Text></TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.insertButton]} onPress={handleInsert}><Text style={styles.buttonText}>Inserir</Text></TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.importButton]}><Text style={[styles.buttonText, { color: '#333' }]}>Importar</Text></TouchableOpacity>
			</View>

			<View style={styles.listHeader}>
				<Text style={[styles.headerText, { flex: 1.8 }]}>PLACA</Text>
				<Text style={[styles.headerText, { flex: 2.2 }]}>MODELO</Text>
				<Text style={[styles.headerText, { flex: 1.5, textAlign: 'center' }]}>COMB.</Text>
				<Text style={[styles.headerText, { flex: 1.8, textAlign: 'center' }]}>SITUAÇÃO</Text>
				<Text style={[styles.headerText, { flex: 1.2, textAlign: 'center' }]}>AÇÕES</Text>
			</View>

			{isLoading ? (
				<ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />
			) : error ? (
				<Text style={styles.errorText}>{error}</Text>
			) : (
				<FlatList
					data={displayedVehicles}
					renderItem={({ item }) => <VehicleListItem item={item} />}
					keyExtractor={(item) => item.placa}
					ListEmptyComponent={<Text style={styles.emptyText}>Nenhum veículo encontrado.</Text>}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
	filterContainer: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3, },
	filterTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
	filterRow: { flexDirection: 'row', justifyContent: 'space-between' },
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		padding: 10,
		fontSize: 16,
		backgroundColor: '#fafafa',
	},
	buttonsContainer: { flexDirection: 'row', marginBottom: 20 },
	button: { flex: 1, padding: 12, borderRadius: 5, alignItems: 'center', marginRight: 10 },
	searchButton: { backgroundColor: '#3498db' },
	insertButton: { backgroundColor: '#2ecc71' },
	importButton: { backgroundColor: '#ecf0f1', borderWidth: 1, borderColor: '#bdc3c7' },
	buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
	listHeader: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 5, backgroundColor: '#e9ecef', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
	headerText: { fontWeight: 'bold', color: '#495057', fontSize: 13 },
	row: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 5, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
	cell: { color: '#333', fontSize: 13 }, // AJUSTE: Tamanho da fonte da célula
	actionsCell: { flexDirection: 'row', justifyContent: 'space-around' },
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