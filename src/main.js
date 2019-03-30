import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import moment from 'moment'
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.moment = moment;
Vue.use(VeeValidate);
Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
