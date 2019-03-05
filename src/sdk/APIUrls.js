const isDev = typeof process !== 'undefined' ? process.env.NODE_ENV === 'development' : false;

const API_BASE = isDev ? 'http://localhost:3030/bs/v1/drafter' : '/bs/v1/drafter';

const API = {
  REGISTER_USER: () => `${API_BASE}/register`,
  LOGIN_USER: () => `${API_BASE}/login`,
  LOGOUT_USER: () => `${API_BASE}/logout`,
};

export default API;
