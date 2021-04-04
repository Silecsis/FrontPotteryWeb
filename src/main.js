import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import router from './router';
import './assets/css/index.css';
import 'alpinejs';
import VuePaginate from 'vue-paginate';

Vue.config.productionTip = false;
Vue.use(VuePaginate);

Vue.directive('demo', {
  update: function (el, binding, vnode) {
    let user =binding.value;

    if(!user || user.type != binding.arg){
      el.style.display="none";
    }else{
      el.style.display=null;
    }
  },

  inserted: function (el, binding, vnode) {
    let user =binding.value;

    if(!user || user.type != binding.arg){
      el.style.display="none";
    }else{
      el.style.display=null;
    }
  },
});

new Vue({
  router,
  store, // registramos el store
  render: function (h) { return h(App) },
}).$mount('#app')