import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const authStore = useAuthStore();

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });


   // Middleware Autenticación
   Router.beforeEach(async (to, from, next) => {
    try {
      const response = await api.get('/validate_session.php', { withCredentials: true });
      console.log(response.data);
      const autenticado = response.data.message.autenticado;
      const usuario = response.data.message.usuario;
      if (autenticado && usuario) {
        console.log(usuario);
        authStore.setUser(usuario);
        if (to.path === '/login') {
          next('/dashboard');
        } else {
          next();
        }
      } else {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          next('/login');
        } else {
          next();
        }
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      if (to.path !== '/login') {
        //next('/login');
        next();
      } else {
        next();
      }
    }
  });

  return Router
})
