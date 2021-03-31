<template>
  <a
    href="javascript:void(0)"
    @click="$router.push({ name })"
    class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out"
    :class="classes"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: ["name"],
  computed: {
    isActive: function () {
      return this.$route.name == this.name;
      
    },

    classes: function () {
      if (this.isActive) {
        return "border-indigo-400 text-gray-900 focus:border-indigo-700";
      } else {
        return "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300";
      }
    },
  },
};
</script>