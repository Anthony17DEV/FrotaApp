import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.tabBarContainer, { paddingBottom: insets.bottom, height: 70 + insets.bottom }]}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					typeof options.title === 'string' ? options.title : route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const iconColor = isFocused ? '#4D66FF' : '#B0B0B0';
				const iconSize = 24;

				const getIconName = (routeName: string, focused: boolean) => {
					switch (routeName) {
						case 'home': return 'home';
						case 'categories': return 'grid';
						case 'cart': return 'shopping-bag';
						case 'profile': return 'user';
						default: return 'circle';
					}
				};
				const iconName = getIconName(route.name, isFocused);


				return (
					<TouchableOpacity
						key={route.key}
						onPress={onPress}
						style={styles.tabButton}
					>
						{isFocused && (
							<View style={styles.activeBlob} />
						)}

						<Feather name={iconName} size={iconSize} color={iconColor} style={isFocused && { marginBottom: 5 }} />

					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	tabBarContainer: {
		flexDirection: 'row',
		backgroundColor: '#f0f0f0',
		elevation: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingHorizontal: 10,
	},
	tabButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		position: 'relative',
	},
	activeBlob: {
		position: 'absolute',
		bottom: 5,
		width: 30,
		height: 10,
		backgroundColor: '#4D66FF',
		borderRadius: 5,
		opacity: 0.8,
	},
});