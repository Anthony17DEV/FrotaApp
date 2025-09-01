import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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
					title: 'Dashboard',
					drawerIcon: ({ size, color }: { size: number; color: string }) => (
						<Feather name="layout" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="veiculos"
				options={{
					title: 'Veículos',
					drawerIcon: ({ size, color }: { size: number; color: string }) => (
						<Feather name="truck" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="condutores"
				options={{
					title: 'Condutores',
					drawerIcon: ({ size, color }: { size: number; color: string }) => (
						<MaterialCommunityIcons name="steering" size={24} color="black" />
					),
				}}
			/>
			<Drawer.Screen
				name="transacoes"
				options={{
					title: 'Transações',
					drawerIcon: ({ size, color }: { size: number; color: string }) => (
						<Feather name="dollar-sign" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="estabelecimentos"
				options={{
					title: 'Estabelecimentos',
					drawerIcon: ({ size, color }: { size: number; color: string }) => (
						<AntDesign name="enviromento" size={24} color="black" />
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
			<Drawer.Screen
				name="edit-profile"
				options={{
					title: 'Editar Perfil',
					drawerIcon: ({ size, color }: { size: number; color: string }) => (
						<Feather name="edit" size={size} color={color} />
					),
				}}
			/>
		</Drawer>
	);
}