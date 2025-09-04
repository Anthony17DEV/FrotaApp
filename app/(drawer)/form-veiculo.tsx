import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VehicleFormScreen() {
	const router = useRouter();
	const [placa, setPlaca] = useState('');
	const [modelo, setModelo] = useState('');
	const [ano, setAno] = useState('');
	const [tanque, setTanque] = useState('');
	const [combustivel, setCombustivel] = useState('');
	const [chassi, setChassi] = useState('');
	const [cor, setCor] = useState('');
	const [propNome, setPropNome] = useState('');
	const [propCNPJ, setPropCNPJ] = useState('');
	const [todoDia, setTodoDia] = useState(true);
	const [segunda, setSegunda] = useState(true);
	const [terca, setTerca] = useState(true);
	const [quarta, setQuarta] = useState(true);
	const [quinta, setQuinta] = useState(true);
	const [sexta, setSexta] = useState(true);
	const [sabado, setSabado] = useState(true);
	const [domingo, setDomingo] = useState(true);

	useEffect(() => {
		setSegunda(todoDia);
		setTerca(todoDia);
		setQuarta(todoDia);
		setQuinta(todoDia);
		setSexta(todoDia);
		setSabado(todoDia);
		setDomingo(todoDia);
	}, [todoDia]);

	const handleSubmit = () => {
		const formData = { placa, modelo, ano, tanque, combustivel, chassi, cor, propNome, propCNPJ, todoDia, segunda, terca, quarta, quinta, sexta, sabado, domingo };
		console.log("Dados do formulário para salvar:", formData);
	};

	const handleGoBack = () => {
		router.back();
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView style={styles.container}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Informações do Veículo</Text>
					<Text style={styles.label}>* Placa</Text>
					<TextInput style={styles.input} value={placa} onChangeText={setPlaca} placeholder="ABC1D23" autoCapitalize="characters" />

					<Text style={styles.label}>Modelo</Text>
					<TextInput style={styles.input} value={modelo} onChangeText={setModelo} placeholder="Ex: Hilux, Bros NXR" />

					<Text style={styles.label}>Ano Fabricação</Text>
					<TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ex: 2023" keyboardType="numeric" maxLength={4} />

					<Text style={styles.label}>Capacidade do Tanque (L)</Text>
					<TextInput style={styles.input} value={tanque} onChangeText={setTanque} placeholder="Ex: 50" keyboardType="numeric" />

					<Text style={styles.label}>Combustível</Text>
					<TextInput style={styles.input} value={combustivel} onChangeText={setCombustivel} placeholder="Gasolina, Diesel, Flex..." />

					<Text style={styles.label}>Chassi</Text>
					<TextInput style={styles.input} value={chassi} onChangeText={setChassi} placeholder="ABC-098-LAKJ" />

					<Text style={styles.label}>Cor</Text>
					<TextInput style={styles.input} value={cor} onChangeText={setCor} placeholder="Verde" />
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Informações do Proprietário</Text>
					<Text style={styles.label}>Nome do Proprietário</Text>
					<TextInput style={styles.input} value={propNome} onChangeText={setPropNome} placeholder="Nome completo" />

					<Text style={styles.label}>CPF/CNPJ do Proprietário</Text>
					<TextInput style={styles.input} value={propCNPJ} onChangeText={setPropCNPJ} placeholder="00.000.000/0000-00" keyboardType="numeric" />
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Parâmetros de Uso</Text>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Permitido todos os dias?</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={todoDia ? "#ffffffff" : "#f4f3f4"} onValueChange={setTodoDia} value={todoDia} />
					</View>
					<View style={styles.divider} />
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Segunda-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={segunda ? "#ffffffff" : "#f4f3f4"} onValueChange={setSegunda} value={segunda} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Terça-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={terca ? "#ffffffff" : "#f4f3f4"} onValueChange={setTerca} value={terca} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Quarta-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={quarta ? "#ffffffff" : "#f4f3f4"} onValueChange={setQuarta} value={quarta} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Quinta-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={quinta ? "#ffffffff" : "#f4f3f4"} onValueChange={setQuinta} value={quinta} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Sexta-Feira</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={sexta ? "#ffffffff" : "#f4f3f4"} onValueChange={setSexta} value={sexta} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Sábado</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={sabado ? "#ffffffff" : "#f4f3f4"} onValueChange={setSabado} value={sabado} />
					</View>
					<View style={styles.switchRow}>
						<Text style={styles.labelSwitch}>Domingo</Text>
						<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={domingo ? "#ffffffff" : "#f4f3f4"} onValueChange={setDomingo} value={domingo} />
					</View>
				</View>

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

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 10 },
	section: { backgroundColor: 'white', marginHorizontal: 20, marginBottom: 20, padding: 20, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
	sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
	label: { fontSize: 14, color: '#666', marginBottom: 5, marginTop: 10 },
	labelSwitch: { fontSize: 16, color: '#333' },
	input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 12, fontSize: 16, backgroundColor: '#fafafa' },
	switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
	divider: { height: 1, backgroundColor: '#eee', marginVertical: 5 },
	buttonsContainer: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 40 },
	button: { flex: 1, padding: 15, borderRadius: 5, alignItems: 'center' },
	saveButton: { backgroundColor: '#2ecc71', marginRight: 10 },
	cancelButton: { backgroundColor: '#ecf0f1', borderWidth: 1, borderColor: '#bdc3c7' },
	buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

