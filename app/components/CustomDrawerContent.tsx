import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Logo from '../../assets/images/logologo.png';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.header}>
				<Image source={Logo} style={styles.logo} />
			</View>

			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{ paddingTop: 25 }}
			>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			<View style={styles.footer}>
				<Feather name="log-out" size={20} color="#666" />
				<Text style={styles.footerText}>Sair</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		padding: 20,
		paddingTop: 35,
		backgroundColor: '#0095DA',
		alignItems: 'center',
	},
	logo: {
		width: 180,
		height: 180,
		resizeMode: 'contain',
		marginBottom: 0,
	},
	headerText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
	footer: {
		borderTopWidth: 1,
		borderTopColor: '#eee',
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	footerText: {
		marginLeft: 15,
		fontSize: 16,
		color: '#666',
	},
});