<template>
  <nav x-data="{ open: false }" class="bg-gray-100 border-b border-gray-300">
    <navigation-normal/>
    <navigation-responsive/>
  </nav>
</template>

<script>
import NavigationNormal from "./Navigation-Normal";
import NavigationResponsive from "./Navigation-Responsive";

export default {
  components: {
    NavigationNormal,
    NavigationResponsive,
  },
};
</script>