import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const IconBackground = ({ value, onPress }: { value: React.ReactNode; onPress?: () => void }) => (
	<TouchableOpacity onPress={onPress} style={styles.iconButton}>
		{value}
	</TouchableOpacity>
);

interface HeaderContainerProps {
	onPress?: () => void;
}

export function HeaderContainer({ onPress }: HeaderContainerProps) {
	const router = useRouter();

	const textColorStyle = '#000000';
	const viewRTLStyle = 'row';

	return (
		<View style={[styles.header, { flexDirection: viewRTLStyle }]}>
			<View style={[styles.leftSection, { flexDirection: viewRTLStyle }]}>
				<IconBackground
					value={<Feather name="menu" size={24} color={textColorStyle} />}
					onPress={onPress}
				/>
				<View style={{ marginLeft: 5 }}>
					<Text style={[styles.greetingText, { color: textColorStyle }]}>
						Olá, Anthony!
					</Text>
				</View>
			</View>

			<View style={styles.rightSection}>
				<IconBackground
					onPress={() => console.log('Navegar para Notificações')}
					value={<Feather name="bell" size={24} color={textColorStyle} />}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
	},
	leftSection: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightSection: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	greetingText: {
		fontSize: 19,
		fontWeight: 'bold',
	},
	img: {
		width: 32,
		height: 22,
		resizeMode: 'contain',
	},
	iconButton: {
		padding: 8,
		borderRadius: 20,
		backgroundColor: '#f0f0f0',
	},
});
