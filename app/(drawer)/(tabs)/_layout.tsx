import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { CustomTabBar } from '../../components/CustomTabBar';

export default function TabLayout() {
	return (
		<Tabs
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Início',
					tabBarIcon: ({ color, size }) => (
						<Feather name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					title: 'Categorias',
					tabBarIcon: ({ color, size }) => (
						<Feather name="grid" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="cart"
				options={{
					title: 'Carrinho',
					tabBarIcon: ({ color, size }) => (
						<Feather name="shopping-cart" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Perfil',
					tabBarIcon: ({ color, size }) => (
						<Feather name="user" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
