import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { frotaplusService } from 'src/services/frotaplusService';

import Fundo from '../assets/images/loaderBgDark.png';
import LoaderGif from '../assets/images/loading.gif';

export default function LoadingScreen() {
	const router = useRouter();
	const { convenio, usuario, senha } = useLocalSearchParams();

	useEffect(() => {
		const performLogin = async () => {
			if (typeof convenio !== 'string' || typeof usuario !== 'string' || typeof senha !== 'string') {
				Alert.alert('Erro', 'Dados de login inválidos. Tentando voltar...');
				router.replace('/');
				return;
			}

			try {
				const response = await frotaplusService.login({ convenio, usuario, senha });

				if (response.success) {
					router.replace('/(drawer)/(tabs)/home');
				} else {
					router.replace({
						pathname: '/home',
						params: { error: response.message || 'Convênio, usuário ou senha inválidos.' }
					});
				}
			} catch (error) {
				console.error('Falha no login:', error);
				router.replace({
					pathname: '/',
					params: { error: 'Não foi possível conectar. Verifique sua internet.' }
				});
			}
		};

		performLogin();
	}, []);

	return (
		<ImageBackground source={Fundo} style={styles.background}>
			<View style={styles.container}>
				<Image source={LoaderGif} style={styles.gif} transition={500} />
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: { flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
	container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
	gif: { width: 150, height: 150 },
});