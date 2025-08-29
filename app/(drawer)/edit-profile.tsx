import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EditProfileScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left" size={24} color="#333" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Editar Perfil</Text>
				<View style={{ width: 24 }} />
			</View>
			<View style={styles.content}>
				<Text>Aqui ficará o formulário para editar o perfil.</Text>
			</View>
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
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
});