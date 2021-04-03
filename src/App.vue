<template>
  <component :is="layout"></component>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";

import LoginLayout from "./views/layouts/Login";
import PrincipalLayout from "./views/layouts/Principal";

export default {
  components: { LoginLayout, PrincipalLayout },
  computed: mapState(["layout"]),
  created: function () {
    axios.interceptors.request.use(function (config) {
      const token = sessionStorage.getItem("token");
      if (token) {
        if(!config.data){
          config.data={};
        }

        config.data.user_id= JSON.parse(sessionStorage.getItem('user')).id;
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    });
  },
};
</script>