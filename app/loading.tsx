import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import Fundo from '../assets/images/loaderBgDark.png';
import LoaderGif from '../assets/images/loading.gif';

export default function LoadingScreen() {
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace('/home');
		}, 2000);

		return () => clearTimeout(timer);
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
	background: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	gif: {
		width: 150,
		height: 150,
	},
});