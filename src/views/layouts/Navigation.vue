<template>
  <nav x-data="{ open: false }" class="pott-grey border-b border-gray-100 fixed w-full">
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