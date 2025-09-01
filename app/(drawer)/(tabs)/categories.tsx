import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { categories, Category } from '../../../data/categoryData';

export default function CategoriesScreen() {
	const router = useRouter();

	const handleCategoryPress = (category: Category) => {
		router.push({
			pathname: '/category-detail',
			params: { categoryId: category.id, categoryName: category.name },
		});
	};

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Categorias</Text>
			</View>

			{/* Barra de Busca */}
			<View style={styles.searchContainer}>
				<Feather name="search" size={20} color="#999" style={styles.searchIcon} />
				<TextInput placeholder="Buscar por categoria..." style={styles.searchInput} />
			</View>

			{/* Grid de Categorias */}
			<FlatList
				data={categories}
				keyExtractor={(item) => item.id}
				numColumns={2}
				contentContainerStyle={styles.grid}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item)}>
						<Image source={item.image} style={styles.categoryImage} />
						<Text style={styles.categoryName}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: 'white' },
	header: { padding: 20, alignItems: 'center' },
	headerTitle: { fontSize: 22, fontWeight: 'bold' },
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		marginHorizontal: 20,
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	searchIcon: { marginRight: 10 },
	searchInput: { flex: 1, height: 50, fontSize: 16 },
	grid: { paddingHorizontal: 15 },
	categoryCard: {
		flex: 1,
		margin: 5,
		height: 150,
		borderRadius: 10,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	categoryImage: { width: 60, height: 60, marginBottom: 10 },
	categoryName: { fontSize: 16, fontWeight: '500' },
});