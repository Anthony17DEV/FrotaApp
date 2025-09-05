import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { frotaplusService } from 'src/services/frotaplusService';
import { useAuth } from '../../contexts/AuthContext';

const formatDataForPicker = (data: any[]) => {
	if (!Array.isArray(data)) return [];
	return data.map(item => ({
		label: item.Descricao,
		value: String(item.Id),
	}));
};

export default function VehicleFormScreen() {
	const { user } = useAuth();
	const router = useRouter();
	const vehicleData = useLocalSearchParams();
	const isEditing = !!vehicleData.placa;
	const [isLoading, setIsLoading] = useState(true);
	const [placa, setPlaca] = useState('');
	const [modelo, setModelo] = useState('');
	const [ano, setAno] = useState('');
	const [tanque, setTanque] = useState('');
	const [combustivel, setCombustivel] = useState<string | null>(null);
	const [chassi, setChassi] = useState('');
	const [cor, setCor] = useState('');
	const [propNome, setPropNome] = useState('');
	const [propCNPJ, setPropCNPJ] = useState('');
	const [tipoVeiculo, setTipoVeiculo] = useState<string | null>(null);
	const [kmInicial, setKmInicial] = useState('');
	const [tipoMedicao, setTipoMedicao] = useState<string | null>('0');
	const [valorPorPeriodo, setValorPorPeriodo] = useState('');
	const [maxPorLitro, setMaxPorLitro] = useState('');
	const [minDias, setMinDias] = useState('');
	const [travarKmMenor, setTravarKmMenor] = useState<string | null>('N');
	const [grupoFrota, setGrupoFrota] = useState<string | null>(null);
	const [tipoFrota, setTipoFrota] = useState<string | null>(null);
	const [alocacao, setAlocacao] = useState<string | null>(null);
	const [grupoFrotaOptions, setGrupoFrotaOptions] = useState<{ label: string, value: string }[]>([]);
	const [tipoFrotaOptions, setTipoFrotaOptions] = useState<{ label: string, value: string }[]>([]);
	const [alocacaoOptions, setAlocacaoOptions] = useState<{ label: string, value: string }[]>([]);
	const [todoDia, setTodoDia] = useState(true);
	const [segunda, setSegunda] = useState(true);
	const [terca, setTerca] = useState(true);
	const [quarta, setQuarta] = useState(true);
	const [quinta, setQuinta] = useState(true);
	const [sexta, setSexta] = useState(true);
	const [sabado, setSabado] = useState(true);
	const [domingo, setDomingo] = useState(true);

	useEffect(() => {
		const fetchDataForDropdowns = async () => {
			if (!user || !user.convenio) {
				Alert.alert("Erro", "Não foi possível identificar o usuário. Tente fazer login novamente.");
				return;
			}
			setIsLoading(true);
			try {
				const [grupos, tipos, alocacoes] = await Promise.all([
					frotaplusService.getGruposFrota(user.convenio),
					frotaplusService.getTiposFrota(user.convenio),
					frotaplusService.getAlocacoes(user.convenio),
				]);

				setGrupoFrotaOptions(formatDataForPicker(grupos));
				setTipoFrotaOptions(formatDataForPicker(tipos));
				setAlocacaoOptions(formatDataForPicker(alocacoes));

			} catch (error) {
				Alert.alert("Erro", "Não foi possível carregar os dados para o formulário.");
				console.error("Falha ao carregar dados do formulário", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchDataForDropdowns();
	}, [user]);

	useEffect(() => {
		if (isEditing && !isLoading) {
			setPlaca(vehicleData.placa as string || '');
			setModelo(vehicleData.modelo as string || '');
			setAno(vehicleData.ano as string || '');
			setTanque(vehicleData.tanque as string || '');
			setCombustivel(vehicleData.combustivel as string || '');
			setChassi(vehicleData.chassi as string || '');
			setCor(vehicleData.cor as string || '');
			setPropNome(vehicleData.propNome as string || '');
			setPropCNPJ(vehicleData.propCNPJ as string || '');
			setKmInicial(vehicleData.kmInicial as string || '');
			setValorPorPeriodo(vehicleData.valorPorPeriodo as string || '');
			setMaxPorLitro(vehicleData.maxPorLitro as string || '');
			setMinDias(vehicleData.minDias as string || '');
			setTravarKmMenor(vehicleData.travarKmMenor as string || 'N');
			setTipoVeiculo(vehicleData.tipoVeiculo as string || null);
			setTipoMedicao(vehicleData.tipoMedicao as string || '0');
			setGrupoFrota(vehicleData.grupoFrota as string || null);
			setTipoFrota(vehicleData.tipoFrota as string || null);
			setAlocacao(vehicleData.alocacao as string || null);
			setTodoDia(vehicleData.todoDia === 'true' || vehicleData.todoDia === 'S');
			setSegunda(vehicleData.segunda === 'true' || vehicleData.segunda === 'S');
			setTerca(vehicleData.terca === 'true' || vehicleData.terca === 'S');
			setQuarta(vehicleData.quarta === 'true' || vehicleData.quarta === 'S');
			setQuinta(vehicleData.quinta === 'true' || vehicleData.quinta === 'S');
			setSexta(vehicleData.sexta === 'true' || vehicleData.sexta === 'S');
			setSabado(vehicleData.sabado === 'true' || vehicleData.sabado === 'S');
			setDomingo(vehicleData.domingo === 'true' || vehicleData.domingo === 'S');
		}
	}, [isEditing, vehicleData, isLoading]);

	useEffect(() => {
		if (todoDia) {
			setSegunda(true); setTerca(true); setQuarta(true);
			setQuinta(true); setSexta(true); setSabado(true); setDomingo(true);
		}
	}, [todoDia]);

	const handleSubmit = () => {
		const formData = { placa, modelo, ano, tanque, combustivel, chassi, cor, propNome, propCNPJ, tipoVeiculo, kmInicial, tipoMedicao, valorPorPeriodo, maxPorLitro, minDias, travarKmMenor, grupoFrota, tipoFrota, alocacao, todoDia, segunda, terca, quarta, quinta, sexta, sabado, domingo };
		console.log("Dados do formulário para salvar:", formData);
		Alert.alert("Sucesso", "Veículo salvo (simulação).");
	};

	const handleGoBack = () => {
		router.back();
	};

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#0095DA" />
				<Text>Carregando dados do formulário...</Text>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
				{/* --- SEÇÃO 1: INFORMAÇÕES DO VEÍCULO --- */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Informações do Veículo</Text>

					<Text style={styles.label}>* Placa</Text>
					<TextInput style={styles.input} value={placa} onChangeText={setPlaca} placeholder="ABC1D23" autoCapitalize="characters" editable={!isEditing} />

					<Text style={styles.label}>Tipo de Veículo</Text>
					<RNPickerSelect
						placeholder={{ label: "Selecione um tipo...", value: null }}
						onValueChange={(value) => setTipoVeiculo(value)}
						items={[{ label: 'Moto', value: 'M' }, { label: 'Caminhão', value: 'C' }, { label: 'Kombi', value: 'K' }, { label: 'Pickup', value: 'P' }, { label: 'Van', value: 'V' }, { label: 'Leve', value: 'L' }, { label: 'Ônibus', value: 'O' }, { label: 'Máquinas Pesadas', value: 'A' }, { label: 'Equipamentos', value: 'E' }, { label: 'Gerador', value: 'G' }]}
						style={pickerSelectStyles} value={tipoVeiculo} Icon={() => <Feather name="chevron-down" size={20} color="gray" />}
					/>

					<Text style={styles.label}>Modelo</Text>
					<TextInput style={styles.input} value={modelo} onChangeText={setModelo} placeholder="Ex: Hilux, Bros NXR" />

					<Text style={styles.label}>Ano Fabricação</Text>
					<TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ex: 2023" keyboardType="numeric" maxLength={4} />

					<Text style={styles.label}>Capacidade do Tanque (L)</Text>
					<TextInput style={styles.input} value={tanque} onChangeText={setTanque} placeholder="Ex: 50" keyboardType="numeric" />

					<Text style={styles.label}>Combustível</Text>
					<RNPickerSelect
						placeholder={{ label: "Selecione um combustível...", value: null }}
						onValueChange={(value) => setCombustivel(value)}
						items={[{ label: "Álcool", value: "A" }, { label: "Gasolina", value: "G" }, { label: "Diesel", value: "D" }, { label: "GNV", value: "S" }, { label: "Flex", value: "F" }, { label: "Outros", value: "O" }]}
						style={pickerSelectStyles} value={combustivel} Icon={() => <Feather name="chevron-down" size={20} color="gray" />}
					/>

					<Text style={styles.label}>Chassi</Text>
					<TextInput style={styles.input} value={chassi} onChangeText={setChassi} placeholder="ABC-098-LAKJ" />

					<Text style={styles.label}>Cor</Text>
					<TextInput style={styles.input} value={cor} onChangeText={setCor} placeholder="Verde" />
				</View>

				{/* --- SEÇÃO 2: INFORMAÇÕES DO PROPRIETÁRIO --- */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Informações do Proprietário</Text>
					<Text style={styles.label}>Nome do Proprietário</Text>
					<TextInput style={styles.input} value={propNome} onChangeText={setPropNome} placeholder="Nome completo" />
					<Text style={styles.label}>CPF/CNPJ do Proprietário</Text>
					<TextInput style={styles.input} value={propCNPJ} onChangeText={setPropCNPJ} placeholder="00.000.000/0000-00" keyboardType="numeric" />
				</View>

				{/* --- SEÇÃO 3: PARÂMETROS DE FROTA --- */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Parâmetros de Frota</Text>

					<Text style={styles.label}>Tipo de Medição</Text>
					<RNPickerSelect
						placeholder={{}} onValueChange={(value) => setTipoMedicao(value)}
						items={[{ label: 'Odômetro', value: '0' }, { label: 'Horímetro', value: '1' }]}
						style={pickerSelectStyles} value={tipoMedicao} Icon={() => <Feather name="chevron-down" size={20} color="gray" />}
					/>

					<Text style={styles.label}>KM Inicial</Text>
					<TextInput style={styles.input} value={kmInicial} onChangeText={setKmInicial} placeholder="Ex: 15000" keyboardType="numeric" />

					<Text style={styles.label}>Grupo de Frota</Text>
					<RNPickerSelect
						placeholder={{ label: "Selecione um grupo...", value: null }} onValueChange={(value) => setGrupoFrota(value)}
						items={grupoFrotaOptions} style={pickerSelectStyles} value={grupoFrota} Icon={() => <Feather name="chevron-down" size={20} color="gray" />}
					/>

					<Text style={styles.label}>Tipo de Frota</Text>
					<RNPickerSelect
						placeholder={{ label: "Selecione um tipo...", value: null }} onValueChange={(value) => setTipoFrota(value)}
						items={tipoFrotaOptions} style={pickerSelectStyles} value={tipoFrota} Icon={() => <Feather name="chevron-down" size={20} color="gray" />}
					/>

					<Text style={styles.label}>Alocação</Text>
					<RNPickerSelect
						placeholder={{ label: "Selecione uma alocação...", value: null }} onValueChange={(value) => setAlocacao(value)}
						items={alocacaoOptions} style={pickerSelectStyles} value={alocacao} Icon={() => <Feather name="chevron-down" size={20} color="gray" />}
					/>
				</View>

				{/* --- SEÇÃO 4: PARÂMETROS DE USO --- */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Parâmetros de Uso</Text>

					<Text style={styles.label}>Valor Máximo por Dia (R$)</Text>
					<TextInput style={styles.input} value={valorPorPeriodo} onChangeText={setValorPorPeriodo} placeholder="Ex: 150,00" keyboardType="numeric" />

					<Text style={styles.label}>Restringir Valor Máx. por Litro (R$)</Text>
					<TextInput style={styles.input} value={maxPorLitro} onChangeText={setMaxPorLitro} placeholder="Ex: 5,50" keyboardType="numeric" />

					<Text style={styles.label}>Restringir Qtd. Mínima de Dias</Text>
					<TextInput style={styles.input} value={minDias} onChangeText={setMinDias} placeholder="Ex: 5" keyboardType="numeric" />

					<Text style={styles.label}>Travar KM menor</Text>
					<RNPickerSelect
						placeholder={{}} onValueChange={(value) => setTravarKmMenor(value)}
						items={[{ label: 'Sim', value: 'S' }, { label: 'Não', value: 'N' }]}
						style={pickerSelectStyles} value={travarKmMenor} Icon={() => <Feather name="chevron-down" size={20} color="gray" />}
					/>

					<View style={styles.divider} />

					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Permitido todos os dias?</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={todoDia ? "#ffffffff" : "#f4f3f4"} onValueChange={setTodoDia} value={todoDia} />
					</View>
					<View style={styles.divider} />
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Segunda-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={segunda ? "#ffffffff" : "#f4f3f4"} onValueChange={setSegunda} value={segunda} disabled={todoDia} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Terça-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={terca ? "#ffffffff" : "#f4f3f4"} onValueChange={setTerca} value={terca} disabled={todoDia} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Quarta-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={quarta ? "#ffffffff" : "#f4f3f4"} onValueChange={setQuarta} value={quarta} disabled={todoDia} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Quinta-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={quinta ? "#ffffffff" : "#f4f3f4"} onValueChange={setQuinta} value={quinta} disabled={todoDia} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Sexta-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={sexta ? "#ffffffff" : "#f4f3f4"} onValueChange={setSexta} value={sexta} disabled={todoDia} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Sábado</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={sabado ? "#ffffffff" : "#f4f3f4"} onValueChange={setSabado} value={sabado} disabled={todoDia} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Domingo</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={domingo ? "#ffffffff" : "#f4f3f4"} onValueChange={setDomingo} value={domingo} disabled={todoDia} />
					</View>
				</View>

				{/* --- BOTÕES --- */}
				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Gravar</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleGoBack}>
						<Text style={[styles.buttonText, { color: '#333' }]}>Voltar</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

// Estilos
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 10 },
	section: { backgroundColor: 'white', marginHorizontal: 20, marginBottom: 20, padding: 20, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
	sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
	label: { fontSize: 14, color: '#666', marginBottom: 5, marginTop: 10 },
	labelSwitch: { fontSize: 16, color: '#333' },
	input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 12, fontSize: 16, backgroundColor: '#fafafa' },
	switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
	divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
	buttonsContainer: { flexDirection: 'row', marginHorizontal: 20, marginTop: 10 },
	button: { flex: 1, padding: 15, borderRadius: 5, alignItems: 'center' },
	saveButton: { backgroundColor: '#2ecc71', marginRight: 10 },
	cancelButton: { backgroundColor: '#ecf0f1', borderWidth: 1, borderColor: '#bdc3c7' },
	buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
	centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, color: 'black', paddingRight: 30, backgroundColor: '#fafafa' },
	inputAndroid: { fontSize: 16, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, color: 'black', paddingRight: 30, backgroundColor: '#fafafa' },
	iconContainer: { top: 15, right: 15 },
});