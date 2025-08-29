import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HeaderContainer() {
	const router = useRouter();
	const navigation = useNavigation();
	const handleNotificationsPress = () => {
		router.push('/notifications');
	};
	const handleMenuPress = () => {
		navigation.dispatch(DrawerActions.openDrawer());
	};
	return (
		<View style={styles.container}>
			{/* Lado Esquerdo: Menu e Saudação */}
			<View style={styles.leftSection}>
				<TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
					<Feather name="menu" size={26} color="#ffffffff" />
				</TouchableOpacity>
				<View>
					<Text style={styles.greetingText}>Olá, Anthony!</Text>
					<Text style={styles.greetingSubtext}>Bem-vindo de volta</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.iconButton} onPress={handleNotificationsPress}>
				<Feather name="bell" size={26} color="#ffffffff" />
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
		paddingBottom: 15,
		backgroundColor: '#0095DA',
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
		color: '#ffffffff',
		marginLeft: 15,
	},
	greetingSubtext: {
		fontSize: 14,
		color: '#ffffffff',
		marginLeft: 15,
	},
});
