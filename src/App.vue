<template>
  <component :is="layout"></component>
</template>
<script>
import LoginLayout from "./views/layouts/Login";
import PrincipalLayout from "./views/layouts/Principal";
import { mapState } from "vuex";


export default {
  components: { LoginLayout, PrincipalLayout },
  computed: mapState(['layout'])
};
</script>