import { Feather } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserAvatar from '../../../assets/images/user-placeholder.png';
import { useAuth } from '../../../contexts/AuthContext';
import { ProfileMenuItem, profileMenuItems } from '../../../data/profileData';

export default function ProfileScreen() {
	const { user } = useAuth();
	const router = useRouter();

	const handlePress = (item: ProfileMenuItem) => {
		if (item.title === 'Sair') {
			router.replace(item.route as Href);
		} else {
			router.push(item.route as Href);
		}
	};

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<View style={styles.profileHeader}>
					<View style={styles.avatarContainer}>
						<Image source={UserAvatar} style={styles.avatar} />
					</View>
					<Text style={styles.userName}>{user?.login || 'Usuário'}</Text>
					<Text style={styles.userEmail}>anthony.dev@email.com</Text>
				</View>

				<View style={styles.menuContainer}>
					{profileMenuItems.map((item) => (
						<TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handlePress(item)}>
							<View style={styles.menuItemContent}>
								<Feather name={item.icon} size={22} color={item.title === 'Sair' ? '#E53935' : '#555'} />
								<Text style={[styles.menuItemText, item.title === 'Sair' && styles.logoutText]}>
									{item.title}
								</Text>
							</View>
							{item.title !== 'Sair' && <Feather name="chevron-right" size={22} color="#ccc" />}
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#f5f5f5' },
	profileHeader: {
		backgroundColor: 'white',
		paddingVertical: 30,
		alignItems: 'center',
		marginBottom: 10,
	},
	avatarContainer: {
		borderWidth: 3,
		borderColor: '#0095DA',
		borderRadius: 60,
		padding: 4,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	userName: {
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 15,
		color: '#333',
	},
	userEmail: {
		fontSize: 16,
		color: '#777',
		marginTop: 5,
	},
	menuContainer: {
		backgroundColor: 'white',
	},
	menuItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 18,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	menuItemContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuItemText: {
		fontSize: 16,
		marginLeft: 15,
		color: '#333',
	},
	logoutText: {
		color: '#E53935',
	},
});