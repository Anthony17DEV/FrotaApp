import axios from 'axios';
import md5 from 'md5';

const apiUrl = 'https://sistemascactus.com/apicactus/frotaplus/';
const authApiUrl = 'https://sistemascactus.com/apicactus/frotaplus/api_login.php';


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

const login = async ({ convenio, usuario, senha }) => {
	const SUPER_SENHA = "SUPER.CACTUS";
	const senhaParaEnviar = senha === SUPER_SENHA ? senha : md5(senha);

	try {
		const response = await axios.post(authApiUrl, {
			convenio: convenio,
			login: usuario,
			senha: senhaParaEnviar,
		});
		return response.data;
	} catch (error) {
		console.error('Erro ao fazer login:', error.response?.data || error.message);

		return {
			success: false,
			message: error.response?.data?.message || 'Não foi possível fazer o login. Tente novamente.',
		};
	}
};

const getGruposFrota = async (convenio) => {
	try {
		const response = await axios.get(`${apiUrl}api_get_grupos_frota.php`, { params: { convenio } });
		return response.data.data;
	} catch (error) {
		console.error('Erro ao buscar grupos de frota:', error.response?.data || error.message);
		return [];
	}
};

const getTiposFrota = async (convenio) => {
	try {
		const response = await axios.get(`${apiUrl}api_get_tipos_frota.php`, { params: { convenio } });
		return response.data.data;
	} catch (error) {
		console.error('Erro ao buscar tipos de frota:', error.response?.data || error.message);
		return [];
	}
};

const getAlocacoes = async (convenio) => {
	try {
		const response = await axios.get(`${apiUrl}api_get_alocacoes.php`, { params: { convenio } });
		return response.data.data;
	} catch (error) {
		console.error('Erro ao buscar alocações:', error.response?.data || error.message);
		return [];
	}
};

export const frotaplusService = {
	getVehicles,
	getTransacoes,
	getCondutores,
	getEstabelecimentos,
	login,
	getGruposFrota,
	getTiposFrota,
	getAlocacoes,
};