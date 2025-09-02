import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { HeaderContainer } from '../components/HeaderContainer';

export default function DrawerLayout() {
	return (
		<Drawer
			drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}

			screenOptions={({ route }) => ({
				headerShown: true,

				header: () => {
					let title = '';
					if (route.name === '(tabs)') {
						title = 'Olá, Anthony!';
					} else if (route.name === 'veiculos') {
						title = 'Veículos';
					} else if (route.name === 'condutores') {
						title = 'Condutores';
					} else if (route.name === 'transacoes') {
						title = 'Transações';
					} else if (route.name === 'estabelecimentos') {
						title = 'Estabelecimentos';
					} else if (route.name === 'notifications') {
						title = 'Notificações';
					} else if (route.name === 'edit-profile') {
						title = 'Editar Perfil';
					}

					return <HeaderContainer title={title} />;
				},
			})}
		>
			<Drawer.Screen
				name="(tabs)"
				options={{
					title: 'Dashboard',
					drawerIcon: ({ size, color }) => (
						<Feather name="layout" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="veiculos"
				options={{
					title: 'Veículos',
					drawerIcon: ({ size, color }) => (
						<Feather name="truck" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="condutores"
				options={{
					title: 'Condutores',
					drawerIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="steering" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="transacoes"
				options={{
					title: 'Transações',
					drawerIcon: ({ size, color }) => (
						<Feather name="dollar-sign" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="estabelecimentos"
				options={{
					title: 'Estabelecimentos',
					drawerIcon: ({ size, color }) => (
						<AntDesign name="enviromento" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="notifications"
				options={{
					title: 'Notificações',
					drawerIcon: ({ size, color }) => (
						<Feather name="bell" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="edit-profile"
				options={{
					title: 'Editar Perfil',
					drawerIcon: ({ size, color }) => (
						<Feather name="edit" size={size} color={color} />
					),
				}}
			/>
		</Drawer>
	);
}
