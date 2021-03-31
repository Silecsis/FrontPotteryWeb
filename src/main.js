import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import router from './router';
import './assets/css/index.css';

Vue.config.productionTip = false

new Vue({
  router,
  store, // registramos el store
  render: function (h) { return h(App) },
}).$mount('#app')