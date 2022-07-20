import axios from "axios";

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: 'c99a687890015fbe80f81d279426568d',
		language: 'en-US',
		// page: 1,
	}
});

export default instance;