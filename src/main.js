import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import router from './router';
import './assets/css/index.css';
import 'alpinejs';
import VuePaginate from 'vue-paginate';

Vue.config.productionTip = false;
Vue.use(VuePaginate);

new Vue({
  router,
  store, // registramos el store
  render: function (h) { return h(App) },
}).$mount('#app')