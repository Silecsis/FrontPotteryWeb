<template>
  <h2>Main View</h2>
</template>
<script>
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
  },
};
</script>