import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { getItemFromStorage, clearDefaultStorage } from './storage';
import { notify } from 'react-notify-toast';

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.timeout = 120000;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

const instance = axios.create();

const handleErrors = (store, error) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Error Logging :: ', error.message, JSON.stringify(error));
  }
  if (error.message) {
    if (error.message === 'Network Error') {
      notify.show('No internet connection. Please check your internet settings', 'error')
      return Promise.reject(error);
    }
  }
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      notify.show('Request Timeout', 'error');
    }
    return Promise.reject(error);
  }
  if (error.response) {
    let errorMessage = 'Something went wrong.';
    switch (error.response.status) {
      case (400):
        notify.show(errorMessage, 'error');
        break;
      case (401):
        clearDefaultStorage();
        // store.dispatch(showToaster({ message: 'Session Expired. Please login again.' }));
        // store.dispatch(replace(SIGN_IN_URL));
        break;
      case (500):
        notify.show(error.message || errorMessage, 'error');
        break;
      default:
        notify.show(error.message || errorMessage, 'error');
        break;
    }
  }
  return Promise.reject(error);
};

const setAuthHeadersInInterceptors = (config) => {
  if (!isEmpty(getItemFromStorage('access-token'))) {
    config.headers.common['Authorization'] = getItemFromStorage('access-token');
  }
  return config;
}


export const setupInterceptor = (store) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => handleErrors(store, error),
  );

  instance.interceptors.request.use(
    (config) => setAuthHeadersInInterceptors(config),
    (error) => Promise.reject(error),
  );
};

export default instance;
