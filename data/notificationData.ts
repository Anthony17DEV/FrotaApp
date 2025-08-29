import { Feather } from '@expo/vector-icons';

export interface NotificationItem {
	id: string;
	icon: keyof typeof Feather.glyphMap;
	title: string;
	subtitle: string;
	time: string;
	isUnread: boolean;
}

export const notifications: NotificationItem[] = [
	{
		id: '1',
		icon: 'package',
		title: 'Pedido Enviado',
		subtitle: 'Seu pedido #12345 foi enviado com sucesso.',
		time: 'Hoje, 13:45',
		isUnread: true,
	},
	{
		id: '2',
		icon: 'percent',
		title: 'Promoção Especial!',
		subtitle: 'Use o cupom FDS10 para 10% de desconto.',
		time: 'Hoje, 09:30',
		isUnread: true,
	},
	{
		id: '3',
		icon: 'credit-card',
		title: 'Pagamento Aprovado',
		subtitle: 'O pagamento do seu pedido #12341 foi aprovado.',
		time: 'Ontem, 18:20',
		isUnread: false,
	},
	{
		id: '4',
		icon: 'truck',
		title: 'Pedido Entregue',
		subtitle: 'Seu pedido #12340 foi entregue. Avalie sua compra!',
		time: '27 de Agosto, 11:10',
		isUnread: false,
	},
];