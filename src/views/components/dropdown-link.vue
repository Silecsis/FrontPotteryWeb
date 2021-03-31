<template>
  <a
    href="javascript:void(0)"
    @click="$router.push({ name })"
    class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
  >
    <slot />
  </a>
</template>

<script>
export default {
 props: ["name"],
}
</script>