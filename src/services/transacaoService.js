import axios from 'axios';

const transacoesApiUrl = 'https://sistemascactus.com/apicactus/frotaplus/transacoes.php';

/**
 * Busca a lista de transaÃ§Ãµes.
 * @param {object} params - Objeto com os filtros. Ex: { numeroCartao: '123' }
 */
const getTransacoes = async (params) => {
	try {
		console.log(`Buscando transaÃ§Ãµes em: ${transacoesApiUrl} com os parÃ¢metros:`, params);
		const response = await axios.get(transacoesApiUrl, { params });
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar transaÃ§Ãµes:', error.response?.data || error.message);
		throw new Error('NÃ£o foi possÃ­vel obter os dados das transaÃ§Ãµes.');
	}
};

export const transacaoService = {
	getTransacoes,
};