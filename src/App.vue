<template>
  <div>
    <div v-if="loading">HOLA</div>
    <component :is="layout"></component>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";

import LoginLayout from "./views/layouts/Login";
import PrincipalLayout from "./views/layouts/Principal";

export default {
  components: { LoginLayout, PrincipalLayout },
  computed: mapState(["layout"]),
  data:function(){
    return{loading:false,};
  },
  created: function () {
    let $this=this;

    axios.interceptors.request.use(function (config) {
      $this.loading=true;
      const token = sessionStorage.getItem("token");
      if (token) {
        if (!config.data) {
          config.data = {};
        }

        config.data.user_id = JSON.parse(sessionStorage.getItem("user")).id;
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    });

    axios.interceptors.response.use((response) => {
      console.log("Recibi respesta");
      $this.loading=false;
      return response;
    });
  },
};
</script>