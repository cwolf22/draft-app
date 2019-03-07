import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import DrafterService from '@/sdk/DrafterService';

const { drafterAPI } = new DrafterService();
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
    AUTHENTICATED: state => state.token.length > 0,
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
      const promise = new Promise((resolve, reject) => {
        drafterAPI
          .register(payload.email, payload.password)
          .then((resp) => {
            commit('SET_USER', payload.email);
            commit('SET_TOKEN', resp.data.token);
            console.log(resp);
            resolve(resp);
          })
          .catch((err) => {
            commit('SET_USER', '');
            commit('SET_TOKEN', '');
            console.log(err);
            reject(err);
          });
      });
      return promise;
    },
    LOGIN: ({ commit }, payload) => {
      const promise = new Promise((resolve, reject) => {
        drafterAPI
          .login(payload.email, payload.password)
          .then((resp) => {
            commit('SET_USER', payload.email);
            commit('SET_TOKEN', resp.data.token);
            resolve(resp);
          })
          .catch((err) => {
            commit('SET_USER', '');
            commit('SET_TOKEN', '');
            reject(err);
          });
      });
      return promise;
    },
    LOGOUT: ({ commit, state }) => {
      drafterAPI.logout(state.email, state.token);
      commit('SET_USER', '');
      commit('SET_TOKEN', '');
    },
    ADD_LEAGUE: ({ commit }, payload) => {
      const promise = new Promise((resolve, reject) => {
        drafterAPI
          .addLeague(payload)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
      return promise;
    },
  },
  plugins: [userStorage.plugin],
});
