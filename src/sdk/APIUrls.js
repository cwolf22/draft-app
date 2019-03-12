const isDev = typeof process !== 'undefined' ? process.env.NODE_ENV === 'development' : false;

const API_BASE = isDev ? 'http://localhost:3000/bs/v1/drafter' : 'https://api.baitingsheep.com/bs/v1/drafter';

console.log(`ENV: ${process.env.NODE_ENV}`);
console.log(`API BASE: ${API_BASE}`);
const API = {
  REGISTER_USER: () => `${API_BASE}/register`,
  LOGIN_USER: () => `${API_BASE}/login`,
  LOGOUT_USER: () => `${API_BASE}/logout`,

  RETRIEVE_LEAGUES: user => `${API_BASE}/leagues/${user}`,
  IMPORT_LEAGUES: (user, sport) => `${API_BASE}/leagues/${user}/${sport}`,
};

export default API;
