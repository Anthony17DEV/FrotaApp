// contexts/AuthContext.tsx

import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { frotaplusService } from 'src/services/frotaplusService';

interface UserData {
	id: number;
	login: string;
	nivel: string;
	convenio: string;
	api_token: string | null;
}

interface AuthContextData {
	user: UserData | null;
	isLoading: boolean;
	signIn: (credentials: any) => Promise<boolean>;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function loadUserFromStorage() {
			const storedUserData = await SecureStore.getItemAsync('userData');
			if (storedUserData) {
				setUser(JSON.parse(storedUserData));
			}
			setIsLoading(false);
		}
		loadUserFromStorage();
	}, []);

	const signIn = async ({ convenio, usuario, senha }: any): Promise<boolean> => {
		const response = await frotaplusService.login({ convenio, usuario, senha });

		if (response.success && response.userData) {
			const userData = response.userData;
			setUser(userData);
			await SecureStore.setItemAsync('userData', JSON.stringify(userData));
			router.replace('/(drawer)/(tabs)/home');
			return true;
		} else {
			router.replace({
				pathname: '/',
				params: { error: response.message || 'Credenciais inválidas.' },
			});
			return false;
		}
	};

	const signOut = async () => {
		setUser(null);
		await SecureStore.deleteItemAsync('userData');
		router.replace('/');
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}