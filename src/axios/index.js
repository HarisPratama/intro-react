import axios from "axios";

const instance = axios.create({
	baseURL: 'http://localhost:3001',
	// params: {
	// 	api_key: 'c99a687890015fbe80f81d279426568d',
	// 	language: 'en-US',
		// page: 1,
	// }
});

export default instance;

const secondInstances = axios.create({
	baseURL: 'https://bem-ipb.herokuapp.com/'
});

export {
	secondInstances
};
