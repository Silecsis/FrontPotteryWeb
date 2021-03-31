<template>
    <img v-if="size=='small'" src="../../assets/img/logo.png" viewBox="0 0 316 316" class=" h-12"/>

    <img v-else src="../../assets/img/logo.png" viewBox="0 0 316 316" width="200px" 
    class="bg-white p-2 rounded-lg border-blue-300" />
</template>

<script>
    export default {
        props:['size'],
    }
</script>