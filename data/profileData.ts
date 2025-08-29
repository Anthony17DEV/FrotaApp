import { Feather } from '@expo/vector-icons';

export interface ProfileMenuItem {
	id: number;
	title: string;
	icon: keyof typeof Feather.glyphMap;
	route: string;
}

export const profileMenuItems: ProfileMenuItem[] = [
	{
		id: 1,
		title: 'Editar Perfil',
		icon: 'user',
		route: '/edit-profile',
	},
	{
		id: 2,
		title: 'Endereços de Entrega',
		icon: 'map-pin',
		route: '/address',
	},
	{
		id: 3,
		title: 'Histórico de Pedidos',
		icon: 'package',
		route: '/order-history',
	},
	{
		id: 4,
		title: 'Formas de Pagamento',
		icon: 'credit-card',
		route: '/payment',
	},
	{
		id: 5,
		title: 'Notificações',
		icon: 'bell',
		route: '/notifications',
	},
	{
		id: 6,
		title: 'Sair',
		icon: 'log-out',
		route: '/login',
	},
];