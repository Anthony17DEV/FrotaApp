import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const productCategories = [
	{ id: 0, title: 'Todos' },
	{ id: 1, title: 'Veículos Leves' },
	{ id: 2, title: 'Caminhões' },
	{ id: 3, title: 'Ônibus' },
	{ id: 4, title: 'Promoções' },
];

const SolidLine = () => <View style={styles.line} />;

export function ProductSwiper() {
	const [selectedItem, setSelectedItem] = useState(0);

	return (
		<View style={styles.wrapper}>
			<SolidLine />
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{productCategories.map(item => (
					<TouchableOpacity
						key={item.id}
						style={[
							styles.container,
							item.id === selectedItem ? styles.selectedMenuItem : null,
						]}
						onPress={() => setSelectedItem(item.id)}
					>
						<Text
							style={[
								styles.menuItemText,
								item.id === selectedItem ? styles.selectedMenuItemText : null,
							]}
						>
							{item.title}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			<SolidLine />
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginVertical: 15,
	},
	line: {
		height: 1,
		backgroundColor: '#EEEEEE',
	},
	container: {
		marginHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		marginVertical: 10,
		paddingVertical: 5,
		paddingHorizontal: 15,
	},
	menuItemText: {
		fontSize: 14,
		color: '#555',
	},
	selectedMenuItemText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
	},
	selectedMenuItem: {
		backgroundColor: '#0095DA',
	},
});
