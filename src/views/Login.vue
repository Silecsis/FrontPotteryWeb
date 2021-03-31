<template>
  <div>
    <h2>Login View</h2>
    <button @click="$router.push('/principal')">ENTRAR</button>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "login-layout");
  },
};
</script>