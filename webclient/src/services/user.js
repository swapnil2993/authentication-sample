import axios from './base';

export const postSignin = (data) => axios.post('/signin', data);
export const postRegistration = (data) => axios.post('/create', data);

export const postResendVerifyEmail = (object) => axios.post('/resend_verify_mail', object);

export const getEmailVerified = (token) => axios.get(`/verify/${token}`);