import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HeaderContainer() {
	return (
		<View style={styles.container}>
			{/* Lado Esquerdo: Menu e Saudação */}
			<View style={styles.leftSection}>
				<TouchableOpacity style={styles.iconButton}>
					<Feather name="menu" size={26} color="#333" />
				</TouchableOpacity>
				<View>
					<Text style={styles.greetingText}>Olá, Anthony!</Text>
					<Text style={styles.greetingSubtext}>Bem-vindo de volta</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.iconButton}>
				<Feather name="bell" size={26} color="#333" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 65,
		paddingBottom: 0,
		backgroundColor: '#FFFFFF',
	},
	leftSection: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconButton: {
		padding: 5,
	},
	greetingText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
		marginLeft: 15,
	},
	greetingSubtext: {
		fontSize: 14,
		color: '#888',
		marginLeft: 15,
	},
});
