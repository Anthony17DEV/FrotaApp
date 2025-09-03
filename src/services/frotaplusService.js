import axios from 'axios';

const apiUrl = 'https://sistemascactus.com/apicactus/frotaplus/';

const getVehicles = async (params) => {
	try {
		const response = await axios.get(`${apiUrl}veiculos.php`, { params });
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar dados dos veículos:', error.response?.data || error.message);
		throw new Error('Não foi possível obter os dados dos veículos.');
	}
};

const getTransacoes = async (params) => {
	try {
		const response = await axios.get(`${apiUrl}transacoes.php`, { params });
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar dados das transações:', error.response?.data || error.message);
		throw new Error('Não foi possível obter os dados das transações.');
	}
};

const getCondutores = async (params) => {
	try {
		const response = await axios.get(`${apiUrl}condutores.php`, { params });
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar dados dos condutores:', error.response?.data || error.message);
		throw new Error('Não foi possível obter os dados dos condutores.');
	}
};

const getEstabelecimentos = async (params) => {
	try {
		const response = await axios.get(`${apiUrl}estabelecimentos.php`, { params });
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar dados dos estabelecimentos:', error.response?.data || error.message);
		throw new Error('Não foi possível obter os dados dos estabelecimentos.');
	}
};

export const frotaplusService = {
	getVehicles,
	getTransacoes,
	getCondutores,
	getEstabelecimentos,
};