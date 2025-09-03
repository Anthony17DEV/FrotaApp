import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CondutorFormScreen() {
	const router = useRouter();

	const [nome, setNome] = useState('');
	const [cpf, setCpf] = useState('');
	const [matricula, setMatricula] = useState('');
	const [nascimento, setNascimento] = useState('');
	const [email, setEmail] = useState('');
	const [telefone, setTelefone] = useState('');
	const [cnh, setCnh] = useState('');
	const [validadeCnh, setValidadeCnh] = useState('');
	const [tipoCnh, setTipoCnh] = useState('');
	const [centroCusto, setCentroCusto] = useState('');

	const handleSubmit = () => {
		const formData = { nome, cpf, matricula, nascimento, email, telefone, cnh, validadeCnh, tipoCnh, centroCusto };
		console.log("Dados do formulário para salvar:", formData);
		router.back();
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
					<Text style={styles.sectionTitle}>Dados do Condutor</Text>

					<Text style={styles.label}>Nome Completo</Text>
					<TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do condutor" />

					<Text style={styles.label}>CPF</Text>
					<TextInput style={styles.input} value={cpf} onChangeText={setCpf} placeholder="000.000.000-00" keyboardType="numeric" />

					<Text style={styles.label}>Matrícula</Text>
					<TextInput style={styles.input} value={matricula} onChangeText={setMatricula} placeholder="Matrícula na empresa" />

					<Text style={styles.label}>Data de Nascimento</Text>
					<TextInput style={styles.input} value={nascimento} onChangeText={setNascimento} placeholder="DD/MM/AAAA" keyboardType="numeric" />

					<Text style={styles.label}>Email</Text>
					<TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="email@exemplo.com" keyboardType="email-address" autoCapitalize="none" />

					<Text style={styles.label}>Telefone</Text>
					<TextInput style={styles.input} value={telefone} onChangeText={setTelefone} placeholder="(00) 00000-0000" keyboardType="phone-pad" />
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Documento de Habilitação (CNH)</Text>

					<Text style={styles.label}>Número da CNH</Text>
					<TextInput style={styles.input} value={cnh} onChangeText={setCnh} keyboardType="numeric" />

					<Text style={styles.label}>Validade da CNH</Text>
					<TextInput style={styles.input} value={validadeCnh} onChangeText={setValidadeCnh} placeholder="DD/MM/AAAA" keyboardType="numeric" />

					<Text style={styles.label}>Tipo (Categoria)</Text>
					<TextInput style={styles.input} value={tipoCnh} onChangeText={setTipoCnh} placeholder="A, B, AB, etc." autoCapitalize="characters" />
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Informações Adicionais</Text>
					<Text style={styles.label}>Centro de Custo</Text>
					<TextInput style={styles.input} value={centroCusto} onChangeText={setCentroCusto} placeholder="Selecione o centro de custo" />
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
	input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 12, fontSize: 16, backgroundColor: '#fafafa' },
	buttonsContainer: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 40 },
	button: { flex: 1, padding: 15, borderRadius: 5, alignItems: 'center' },
	saveButton: { backgroundColor: '#2ecc71', marginRight: 10 },
	cancelButton: { backgroundColor: '#ecf0f1', borderWidth: 1, borderColor: '#bdc3c7' },
	buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
