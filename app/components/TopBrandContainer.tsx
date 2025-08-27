import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const topBrandData = [
	{ id: '1', icon: <FontAwesome5 name="gas-pump" size={24} color="#333" /> },
	{ id: '2', icon: <FontAwesome5 name="gas-pump" size={24} color="#333" /> },
	{ id: '3', icon: <FontAwesome5 name="gas-pump" size={24} color="#333" /> },
	{ id: '4', icon: <FontAwesome5 name="gas-pump" size={24} color="#333" /> },
	{ id: '5', icon: <FontAwesome5 name="gas-pump" size={24} color="#333" /> },
	{ id: '6', icon: <FontAwesome5 name="gas-pump" size={24} color="#333" /> },
];

const HeadingCategory = ({ value }: { value: string }) => (
	<View style={styles.headingContainer}>
		<Text style={styles.headingTitle}>{value}</Text>
	</View>
);

export function TopBrandContainer() {
	const renderItem = ({ item }: { item: typeof topBrandData[0] }) => (
		<View style={styles.itemWrapper}>
			<LinearGradient
				colors={['#FFFFFF', '#F0F0F0']}
				style={styles.container}
			>
				{item.icon}
			</LinearGradient>
		</View>
	);

	return (
		<View style={styles.mainContainer}>
			<HeadingCategory value="Postos Parceiros" />
			<FlatList
				numColumns={3}
				data={topBrandData}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				scrollEnabled={false}
				columnWrapperStyle={{ justifyContent: 'space-around' }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		marginHorizontal: 20,
		marginTop: 20,
	},
	headingContainer: {
		marginBottom: 10,
	},
	headingTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	itemWrapper: {
		alignItems: 'center',
		marginVertical: 7,
	},
	container: {
		width: 100,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		padding: 1,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		borderWidth: 0.5,
		borderColor: '#EDF0FF',
	},
});
