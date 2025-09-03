import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditProfileScreen() {
	const router = useRouter();
	const [imageUri, setImageUri] = useState<string | null>(null);
	const [name, setName] = useState('Nome do Usuário');
	const [email, setEmail] = useState('usuario@email.com');
	const [phone, setPhone] = useState('(00) 99999-9999');

	const handlePickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert('Permissão necessária', 'Precisamos da sua permissão para acessar a galeria de fotos.');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
		}
	};

	const handleSaveChanges = () => {
		console.log('Salvando dados:', { name, email, phone, imageUri });

		Alert.alert('Sucesso!', 'Seu perfil foi atualizado.', [
			{ text: 'OK', onPress: () => router.back() }
		]);
	};

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left" size={24} color="#333" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Editar Perfil</Text>
				<View style={{ width: 24 }} />
			</View>

			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.avatarContainer}>
					<Image
						source={imageUri ? { uri: imageUri } : require('../../assets/images/user-placeholder.png')}
						style={styles.avatar}
					/>
					<TouchableOpacity style={styles.changePhotoButton} onPress={handlePickImage}>
						<Feather name="camera" size={16} color="#fff" />
						<Text style={styles.changePhotoButtonText}>Alterar foto</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.form}>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Nome Completo</Text>
						<TextInput
							style={styles.input}
							value={name}
							onChangeText={setName}
							placeholder="Digite seu nome"
						/>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>E-mail</Text>
						<TextInput
							style={styles.input}
							value={email}
							onChangeText={setEmail}
							placeholder="seu@email.com"
							keyboardType="email-address"
						/>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Telefone</Text>
						<TextInput
							style={styles.input}
							value={phone}
							onChangeText={setPhone}
							placeholder="(00) 00000-0000"
							keyboardType="phone-pad"
						/>
					</View>
				</View>

				{/* Botão de Salvar */}
				<TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
					<Text style={styles.saveButtonText}>Salvar Alterações</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#f5f5f5' },
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
	content: {
		padding: 20,
	},
	avatarContainer: {
		alignItems: 'center',
		marginBottom: 30,
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 3,
		borderColor: '#0095DA',
	},
	changePhotoButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#0095DA',
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
		marginTop: 10,
	},
	changePhotoButtonText: {
		color: '#fff',
		marginLeft: 8,
		fontWeight: 'bold',
	},
	form: {
		width: '100%',
	},
	inputGroup: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		color: '#666',
		marginBottom: 8,
	},
	input: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 15,
		fontSize: 16,
	},
	saveButton: {
		backgroundColor: '#2ecc71',
		padding: 18,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20,
	},
	saveButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});