<!--Vista home-->
<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
      <message :message="message" :type="messageType" />

      <div
        class="flex items-center overflow-hidden shadow-sm sm:rounded-lg m-auto"
      >
        <div
          class="px-10 py-4 bg-white border-2 rounded border-gray-400 m-auto"
        >
          <h2 class="font-bold text-xl text-gray-800">
            ¡Bienvenido a PotterWeb!
          </h2>
        </div>
      </div>

      <div
        class="bg-white overflow-hidden shadow-sm sm:rounded-lg w-1/2 m-auto border-2 border-gray-400"
      >
        <div class="p-6 bg-white">
          <img src="../assets/img/fotoHome.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./components/message";

export default {
  components: {
    Message,
  },
  created() {
    this.$store.commit("SET_TITLE", "Home");
  },
  computed: {
    message: function () {
      var error = this.$route.query.error;
      if (error == "no-admin") {
        return "No tienes permisos de administrador para acceder a esa página";
      }
    },
    messageType: function () {
      var error = this.$route.query.error;
      if (error == "no-admin") {
        return 'error';//Por si el mensaje trae un success o error
      }
    },
  },
};
</script>
