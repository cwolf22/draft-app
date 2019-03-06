import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function route(path, view, meta = {}, children = []) {
  return {
    path,
    name: view,
    meta,
    children,
    component: () => import(`@/views/${view}`),
  };
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    route('/', 'Home'),
    route('/about', 'About'),
    route('/register', 'Register', { authenticatedRedirect: '/leagues' }),
    route('/login', 'Login', { authenticatedRedirect: '/leagues' }),
    route('/leagues', 'Leagues', { requiresAuth: true } ),
    route('/leagues/add', 'LeagueAdd', { requiresAuth: true }),
    route('/calendar', 'Calendar', { requiresAuth: true }),
  ],
});

router.beforeEach((to, from, next) => {
  console.log(router)
  const authenticated = require('../store').default.getters.AUTHENTICATED;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(requiresAuth)
  if (requiresAuth && !authenticated) {
    next("/");
    return;
  }
  if (to.meta.authenticatedRedirect && authenticated) {
    next(to.meta.authenticatedRedirect);
    return;
  }
  next();
})

export default router;
