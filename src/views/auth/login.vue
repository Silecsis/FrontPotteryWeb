<template>
  <div>
    <!-- Session Status -->
    <message :message="message" :type="messageType" />

    <form method="POST">
      <!-- Email Address -->
      <div>
        <v-label for="email">Email</v-label>

        <v-input
          id="email"
          class="block mt-1 w-full"
          type="email"
          name="email"
          v-model="user.email"
          required
          autofocus
        />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <v-label for="password">Contraseña</v-label>

        <v-input
          id="password"
          class="block mt-1 w-full"
          v-model="user.password"
          type="password"
          name="password"
          required
          autocomplete="current-password"
        />
      </div>

      <!-- Remember Me -->
      <div class="block mt-4">
        <label for="remember_me" class="inline-flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="remember"
          />
          <span class="ml-2 text-sm text-gray-600">Recuérdame</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <nav-link
          name="Register"
          class="mr-6 text-sm text-white font-bold bg-blue-500 rounded p-1.5"
          >Registrarme</nav-link
        >

        <nav-link
          class="underline text-sm text-gray-600 hover:text-gray-900"
          name="PasswordRequest"
        >
          ¿Has olvidado tu contraseña?
        </nav-link>

        <v-button class="ml-3" @click.native="enter"> Entrar </v-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

import message from "../components/message.vue";
import NavLink from "../components/nav-link.vue";
import VInput from "../components/v-input";
import VLabel from "../components/v-label";
import VButton from "../components/v-button";

export default {
  components: { message, NavLink, VInput, VLabel, VButton },
  data: function () {
    return {
      user: {},
      message: null,
      messageType: null,
    };
  },
  methods: {
    enter: function () {
      //   if (this.user.name.length == 0) {
      //     this.error.name = "Campo obligatorio";
      //     return;
      //   }

      axios
        .post(`${process.env.VUE_APP_API}/login`, this.user)
        .then((result) => {
          if (result.status === 200) {
            let userStorage = JSON.stringify(result.data.user);
            sessionStorage.setItem("user", userStorage);
            sessionStorage.setItem("token", result.data.token);
            
            this.$router.push({ name: "Dashboard" });
          } else {
            this.showError(result.data.message);
          }
        })
        .catch((error) => {
          if(error.response){
            if ( error.response.data.error == "Unauthorised") {
            this.showError(
              "Los datos introducidos no residen en nuestra base de datos"
            );}
          } else if (error.response) {
            this.message = error.response.data.message;
          }else {
            this.showError("Ha ocurrido un error inesperado");
          }
        });
    },
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