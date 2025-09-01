import axios from 'axios';
const frotaplusApiUrl = 'https://sistemascactus.com/apicactus/frotaplus/cartoes.php';

const getCartoes = async () => {
	try {
		console.log(`Buscando dados em: ${frotaplusApiUrl}`);
		const response = await axios.get(frotaplusApiUrl);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar dados do Frotaplus:', error.response?.data || error.message);
		throw new Error('Não foi possível obter os dados dos cartões.');
	}
};

export const frotaplusService = {
	getCartoes,
};
