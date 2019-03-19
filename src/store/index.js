import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import DrafterService from '@/sdk/DrafterService';
import { constants } from 'zlib';

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
    importing: false,
    leagues: [],
    leagueLoaded: false,
  },
  getters: {
    AUTHENTICATED: state => state.token.length > 0,
    LEAGUES: state => state.leagues,
    LEAGUES_LOADED: state => state.leagueLoaded,
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    STORE_LEAGUES: (state, payload) => {
      state.leagues = payload;
      state.leagueLoaded = true;
    },
    SET_LEAGUE_LOADED: (state, payload) => {
      state.leagueLoaded = payload;
    },
    UPDATE_LEAGUES_STORE: (state, payload) => {
      const filteredLeagues = state.leagues.filter(league => {
        return !(payload.some(imported => imported.id == league.id && imported.type == league.type && imported.sport == league.sport))
      });
      payload.forEach(league => filteredLeagues.push(league));
      state.leagues = filteredLeagues;
    }
  },
  actions: {
    REGISTER: ({ commit }, payload) => {
      const promise = new Promise((resolve, reject) => {
        drafterAPI
          .register(payload.email, payload.password)
          .then((resp) => {
            commit('SET_USER', payload.email);
            commit('SET_TOKEN', resp.data.token);
            resolve(resp)
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
    LOGIN: ({ commit, dispatch }, payload) => {
      const promise = new Promise((resolve, reject) => {
        drafterAPI
          .login(payload.email, payload.password)
          .then((resp) => {
            commit('SET_USER', payload.email);
            commit('SET_TOKEN', resp.data.token);
            resolve(dispatch('RETRIEVE_LEAGUES', { refresh: true }));
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
      //drafterAPI.logout(state.email, state.token);
      commit('SET_USER', '');
      commit('SET_TOKEN', '');
      commit('STORE_LEAGUES', []);
      commit('SET_LEAGUE_LOADED', false);
    },
    IMPORT_LEAGUES: ({ commit, state }, payload) => {
      const promise = new Promise((resolve, reject) => {
        drafterAPI.importLeagues(state.user, state.token, payload)
          .then((data) => {
            commit('UPDATE_LEAGUES_STORE', data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
      return promise;
    },
    RETRIEVE_LEAGUES: ({ commit, state }, payload) => {
      console.log(`Retrieve leagues for ${state.user}`);
      const promise = new Promise((resolve, reject) => {
        if (payload && !payload.refresh && state.leagues.length > 0) {
          resolve(state.leagues);
          return;
        }
        drafterAPI.getLeagues(state.user, state.token)
          .then((data) => {
            commit('STORE_LEAGUES', data);
            resolve(data);
          }).catch(err => reject(err));
      });
      return promise;
    },
  },
  plugins: [userStorage.plugin],
});
