<template>
  <ul class="text-red-600 mt-2">
    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
  </ul>
</template>

<script>
export default {
  props: ["errors"],
};
</script>