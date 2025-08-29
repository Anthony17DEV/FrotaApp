import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importando dados e o tipo
import { NotificationItem, notifications } from '../../data/notificationData';

export default function NotificationsScreen() {
	const router = useRouter();

	const renderItem = ({ item }: { item: NotificationItem }) => (
		<View style={[styles.itemContainer, item.isUnread && styles.unreadItem]}>
			<View style={styles.iconContainer}>
				<Feather name={item.icon} size={24} color="#0077C2" />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.itemTitle}>{item.title}</Text>
				<Text style={styles.itemSubtitle}>{item.subtitle}</Text>
				<Text style={styles.itemTime}>{item.time}</Text>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left" size={24} color="#333" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Notificações</Text>
				<View style={{ width: 24 }} />
			</View>

			<FlatList
				data={notifications}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
			/>
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
	list: { padding: 15 },
	itemContainer: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		borderLeftWidth: 4,
		borderLeftColor: 'transparent',
	},
	unreadItem: {
		borderLeftColor: '#0095DA',
		backgroundColor: '#eefaff',
	},
	iconContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#e0f2fe',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
	},
	textContainer: { flex: 1 },
	itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
	itemSubtitle: { fontSize: 14, color: '#666', marginVertical: 2 },
	itemTime: { fontSize: 12, color: '#999', marginTop: 4 },
});