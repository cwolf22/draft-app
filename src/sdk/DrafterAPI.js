import API from './APIUrls';
import HTTPService from './HTTPService';

const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';

const drafterAPI = () => {
  const api = {
    register: (email, password) => new Promise((resolve, reject) => {
      console.log(`[api] - register user - ${API.REGISTER_USER()}`);
      console.log({ email, password });
      HTTPService.action(PUT, API.REGISTER_USER(), { data: { email, password } })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(err => reject(err));
    }),
    login: (email, password) => new Promise((resolve, reject) => {
      console.log('[api] - login user');
      HTTPService.action(POST, API.LOGIN_USER(), { data:{ email, password } })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(err => reject(err));
    }),
    logout: (email, token) => new Promise((resolve, reject) => {
      console.log('[api] - logout user');
      HTTPService.action(POST, API.LOGOUT_USER(), { email, token })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(err => reject(err));
    }),
  };
  return api;
};

export default drafterAPI;
