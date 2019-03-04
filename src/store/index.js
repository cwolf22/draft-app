import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const userStorage = new VuexPersistence({
  key: 'draft-app',
  storage: window.localStorage,
  reducer: state => ({
    user: state.user,
    token: state.token,
  }),
});
export default new Vuex.Store({
  state: {
    user: '',
    token: '',
  },
  getters: {
    AUTHENTICATED: (state) => {
      return state.token.length > 0;
    },
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
  },
  actions: {
    REGISTER: ({ commit }, payload) => {
      alert("REGISTER");
    },
    LOGIN: ({ commit }, payload) => {
      commit('SET_USER', 'ass');
      commit('SET_TOKEN', 'ass');
    },
    LOGOUT: ({ commit }) => {
      commit('SET_USER', '');
      commit('SET_TOKEN', '');
    },
  },
  plugins: [userStorage.plugin],
});
