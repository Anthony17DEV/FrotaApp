import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { CustomDrawerContent } from '../components/CustomDrawerContent';

export default function DrawerLayout() {
	return (
		<Drawer
			drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
			screenOptions={{ headerShown: false }}
		>
			<Drawer.Screen
				name="(tabs)"
				options={{
					title: 'Início',
					drawerIcon: ({ size, color }: { size: number; color: string }) => (
						<Feather name="home" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="notifications"
				options={{
					title: 'Notificações',
					drawerIcon: ({ size, color }: { size: number; color: string }) => (
						<Feather name="bell" size={size} color={color} />
					),
				}}
			/>
		</Drawer>
	);
}