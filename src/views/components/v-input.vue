<template>
  <input
    class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    v-bind:value="value"
    v-on:input="$emit('input',$event.target.value)"
  />
</template>

<script>
export default {
  props:['value'],
}
</script>

