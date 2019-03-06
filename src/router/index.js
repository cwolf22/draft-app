import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function route(path, view, meta = {}) {
  return {
    path,
    name: view,
    meta,
    component: () => import(`@/views/${view}`),
  };
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    route('/', 'Home'),
    route('/about', 'About'),
    route('/register', 'Register', { authenticatedRedirect: '/leagues'}),
    route('/login', 'Login', { authenticatedRedirect: '/leagues'}),
    route('/leagues', 'Leagues', { requiresAuth: true }),
    route('/calendar', 'Calendar', { requiresAuth: true }),
  ],
});

router.beforeEach((to, from, next) => {
  const authenticated = require('../store').default.getters.AUTHENTICATED;
  const requiresAuth = to.matched.some(record => record.meta.require);
  console.log(authenticated)
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