import axios from 'axios';

const transacoesApiUrl = 'https://sistemascactus.com/apicactus/frotaplus/transacoes.php';

/**
 * Busca a lista de transações.
 * @param {object} params - Objeto com os filtros. Ex: { numeroCartao: '123' }
 */
const getTransacoes = async (params) => {
	try {
		console.log(`Buscando transações em: ${transacoesApiUrl} com os parâmetros:`, params);
		const response = await axios.get(transacoesApiUrl, { params });
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar transações:', error.response?.data || error.message);
		throw new Error('Não foi possível obter os dados das transações.');
	}
};

export const transacaoService = {
	getTransacoes,
};