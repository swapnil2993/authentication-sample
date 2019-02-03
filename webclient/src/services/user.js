import axios from './base';

export const postSignin = (data) => axios.post('/signin', data);
export const postRegistration = (data) => axios.post('/create', data);