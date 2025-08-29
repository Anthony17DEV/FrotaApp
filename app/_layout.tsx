import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="login" />
			<Stack.Screen name="loading" />
			<Stack.Screen name="(drawer)" />
		</Stack>
	);
}