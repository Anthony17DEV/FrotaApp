import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categoryData = [
	{ id: 0, title: 'Todos' },
	{ id: 1, title: 'Gasolina' },
	{ id: 2, title: 'Diesel' },
	{ id: 3, title: 'Etanol' },
	{ id: 4, title: 'GNV' },
];

export function CategorySwiper() {
	const [selectedItem, setSelectedItem] = useState(0);

	return (
		<View style={styles.wrapper}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContainer}
			>
				{categoryData.map(item => (
					<TouchableOpacity
						key={item.id}
						onPress={() => setSelectedItem(item.id)}
						style={[
							styles.itemContainer,
							item.id === selectedItem && styles.selectedItemContainer,
						]}
					>
						<Text
							style={[
								styles.itemText,
								item.id === selectedItem && styles.selectedItemText,
							]}
						>
							{item.title}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 20,
	},
	scrollContainer: {
		paddingHorizontal: 20,
	},
	itemContainer: {
		paddingBottom: 5,
		marginRight: 25,
	},
	selectedItemContainer: {
		borderBottomWidth: 2,
		borderBottomColor: '#0095DA',
	},
	itemText: {
		fontSize: 16,
		color: '#888',
	},
	selectedItemText: {
		color: '#0095DA',
		fontWeight: 'bold',
	},
});
