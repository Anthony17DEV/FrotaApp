import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

export default function LoginScreen() {
	const [convenio, setConvenio] = useState('');
	const [usuario, setUsuario] = useState('');
	const [senha, setSenha] = useState('');

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<StatusBar barStyle="light-content" />

			<ImageBackground
				source={require('@/assets/images/fundo1.png')}
				resizeMode="cover"
				style={styles.background}
			>
				<View style={styles.formContainer}>
					<View style={styles.logoContainer}>
						<Text style={styles.logoPlaceholder}>FAN Plus</Text>
					</View>

					<Text style={styles.title}>Controle de Acesso</Text>

					{/* Input Convênio */}
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Convênio</Text>
						<View style={styles.inputContainer}>
							<MaterialIcons name="apartment" size={20} color="#888" style={styles.icon} />
							<TextInput
								style={styles.input}
								value={convenio}
								onChangeText={setConvenio}
								placeholderTextColor="#999"
							/>
						</View>
					</View>

					{/* Input Usuário */}
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Usuário</Text>
						<View style={styles.inputContainer}>
							<FontAwesome name="user" size={20} color="#888" style={styles.icon} />
							<TextInput
								style={styles.input}
								value={usuario}
								onChangeText={setUsuario}
								placeholderTextColor="#999"
							/>
						</View>
					</View>

					{/* Input Senha */}
					<View style={styles.inputWrapper}>
						<Text style={styles.inputLabel}>Senha</Text>
						<View style={styles.inputContainer}>
							<FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
							<TextInput
								style={styles.input}
								value={senha}
								onChangeText={setSenha}
								secureTextEntry
								placeholderTextColor="#999"
							/>
						</View>
					</View>

					<View style={styles.actionsContainer}>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>Entrar</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
						</TouchableOpacity>
					</View>
				</View>

				<Text style={styles.footerText}>Powered by CACTUS Tecnologia</Text>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
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
		alignSelf: 'flex-start',
		marginBottom: 20,
	},
	logoPlaceholder: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#0083B0',
	},
	title: {
		fontSize: 16,
		color: '#666',
		alignSelf: 'flex-start',
		marginBottom: 20,
		fontWeight: '500',
	},
	inputWrapper: {
		marginBottom: 15,
	},
	inputLabel: {
		color: '#555',
		fontSize: 14,
		marginBottom: 5,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
		height: 45,
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
		bottom: 20,
		color: 'rgba(0, 0, 0, 0.7)',
		fontSize: 12,
	},
});