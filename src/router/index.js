import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function route(path, name, view, meta = {}, children = [], params = {}) {
  return {
    path,
    name,
    meta,
    children,
    params,
    component: () => import(`@/views/${view}`),
  };
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    route('/', 'Home', 'Home'),
    route('/register', 'Register', 'Register', { authenticatedRedirect: '/leagues' }),
    route('/login', 'Login', 'Login', { authenticatedRedirect: '/leagues' }),
    route('/account', 'Account', 'Account', { requiresAuth: true }),
    route('/leagues', 'Leagues', 'Leagues', { requiresAuth: true }),
    route('/leagues/import', 'LeagueImport', 'Leagues', { requiresAuth: true, showImport: true }),
    route('/leagues/:sport', 'LeaguesBySport', 'Leagues', { requiresAuth: true }),
    route('/leagues/:sport/:id', 'League', 'League', { requiresAuth: true }, [
      route('admin', 'Admin', 'AdminTools', { requiresAuth: true }),
      route('rosters', 'Rosters', 'Rosters', { requiresAuth: true }),
      route('', 'Overview', 'LeagueOverview', { requiresAuth: true }),
      route('rankings', 'Rankings', 'PlaceHolder', { requiresAuth: true }),
      route('actions', 'Actions', 'PlaceHolder', { requiresAuth: true }),
    ]),
    route('/calendar', 'Calendar', 'Calendar', { requiresAuth: true }),
  ],
});

router.beforeEach((to, from, next) => {
  const authenticated = require('../store').default.getters.AUTHENTICATED;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !authenticated) {
    next('/login');
    return;
  }
  if (to.meta.authenticatedRedirect && authenticated) {
    next(to.meta.authenticatedRedirect);
    return;
  }
  next();
});

export default router;
