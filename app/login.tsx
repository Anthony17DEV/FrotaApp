import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import FundoLogin from './(tabs)/images/fundo1.png';
import Logo from './(tabs)/images/logo2-fan.png';

export default function LoginScreen() {
	const [convenio, setConvenio] = useState('');
	const [usuario, setUsuario] = useState('');
	const [senha, setSenha] = useState('');
	const router = useRouter();

	const handleLogin = () => {
		router.replace('/loading');
	};

	return (
		<View style={styles.container}>
			<Image source={FundoLogin} style={styles.backgroundImage} resizeMode="cover" />

			<StatusBar barStyle="light-content" />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.keyboardView}
			>
				<View style={styles.formContainer}>
					<View style={styles.logoContainer}>
						<Image source={Logo} style={styles.logoImage} />
					</View>

					<Text style={styles.title}>Controlo de Acesso</Text>

					{/* Inputs */}
					<View style={styles.inputContainer}>
						<MaterialIcons name="apartment" size={20} color="#888" style={styles.icon} />
						<TextInput
							style={styles.input}
							value={convenio}
							onChangeText={setConvenio}
							placeholder="Convênio"
							placeholderTextColor="#BBB"
						/>
					</View>

					<View style={styles.inputContainer}>
						<FontAwesome name="user" size={20} color="#888" style={styles.icon} />
						<TextInput
							style={styles.input}
							value={usuario}
							onChangeText={setUsuario}
							placeholder="Usuário"
							placeholderTextColor="#BBB"
						/>
					</View>

					<View style={styles.inputContainer}>
						<FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
						<TextInput
							style={styles.input}
							value={senha}
							onChangeText={setSenha}
							secureTextEntry
							placeholder="Senha"
							placeholderTextColor="#BBB"
						/>
					</View>

					{/* Ações */}
					<View style={styles.actionsContainer}>
						<TouchableOpacity style={styles.button} onPress={handleLogin}>
							<Text style={styles.buttonText}>Entrar</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.forgotPasswordText}>Esqueceu a sua senha?</Text>
						</TouchableOpacity>
					</View>
				</View>

				<Text style={styles.footerText}>Powered by CACTUS Tecnologia</Text>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	keyboardView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	formContainer: {
		width: '85%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 25,
		alignItems: 'stretch',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8,
	},
	logoContainer: {
		alignSelf: 'center',
		marginBottom: 20,
	},
	logoImage: {
		width: 150,
		height: 60,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 16,
		color: '#666',
		alignSelf: 'center',
		marginBottom: 20,
		fontWeight: '500',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		height: 45,
		backgroundColor: '#f9f9f9',
		marginBottom: 15,
	},
	icon: {
		padding: 10,
	},
	input: {
		flex: 1,
		paddingVertical: 10,
		paddingRight: 10,
		fontSize: 16,
		color: '#333',
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
	},
	button: {
		backgroundColor: '#0095DA',
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	forgotPasswordText: {
		color: '#0095DA',
		fontSize: 14,
	},
	footerText: {
		position: 'absolute',
		bottom: 210,
		alignSelf: 'center',
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: 17,
	},
});
