<template>
  <a
    href="javascript:void(0)"
    @click="$router.push({ name,params })"
  >
    <slot />
  </a>
</template>

<script>
export default {
     props: ["name","params"],
     
}
</script>