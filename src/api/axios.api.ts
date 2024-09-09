import axios from 'axios';

export const instance = axios.create({
	baseURL: 'http://45.131.96.9:3000/dashboard',
	headers: {
		Accept: '*/*'
	}
})