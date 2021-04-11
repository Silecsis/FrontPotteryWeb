<template>
  <div>
    <img
      v-if="url"
      @load="urlOk"
      @error="urlError"
      v-bind="params"
      :src="url"
      ref="imagen"
    />
    <img v-bind="params" ref="default" src="../../assets/img/default-img.png" />
  </div>
</template>

<script>
export default {
  props: ["type", "id", "params"],
  computed: {
    url: function () {
      if (this.type && this.id) {
        return `${process.env.VUE_APP_API}/${this.type}/${this.id}`;
      }
    },
  },
  methods: {
    urlError: function () {
      this.$refs.imagen.style.display = "none";
      this.$refs.default.style.display = null;
    },
    urlOk: function () {
      this.$refs.imagen.style.display = null;
      this.$refs.default.style.display = "none";
    },
  },
};
</script>