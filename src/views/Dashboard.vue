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
            ¡Bienvenido a PotterSil!
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
  data: function () {
    return {
      message: null,
      messageType: null,
    };
  },
  components: {
    Message,
  },
  created() {
    this.$store.commit("SET_TITLE", "Home");
  },
  mounted(){
      if(this.$route.query.error == 'no-admin' ){
          this.showError('No tienes permisos de administrador para acceder a esa página');
      }
  },
  methods: {
    showError: function (msg) {
      this.messageType = "error";
      this.message = msg;
    },
    showSuccess: function (msg) {
      this.messageType = "success";
      this.message = msg;
    },
  },
};
</script>
