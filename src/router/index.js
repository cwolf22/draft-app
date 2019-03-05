import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function route(path, view) {
  return {
    path,
    name: view,
    component: () => import(`@/views/${view}`),
  };
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    route('/', 'Home'),
    route('/about', 'About'),
    route('/register', 'Register'),
    route('/login', 'Login'),
    route('/leagues', 'Leagues'),
    route('/calendar', 'Calendar'),
  ],
});
