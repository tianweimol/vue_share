// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import router from './router';
import VueRouter from 'vue-router';
import goods from '@components/goods/goods';
import sellers from './components/sellers/sellers';
import ratings from './components/ratings/ratings';
import vueResource from 'vue-resource';
import './common/styles/index.styl';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(vueResource);

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router: VueRouter,
//   components: { App },
//   template: '<App/>'
// });
// let app=Vue.extend(App);
const routes = [
  {path: '/', redirect: '/goods'},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: sellers},
  {path: '/goods', name: 'lgoods', component: goods}
];
const router = new VueRouter({
  linkActiveClass: 'active',
  routes // (缩写) 相当于 routes: routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});// .$mount('#app');
