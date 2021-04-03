<template>
  <div>
    <card-sin-logo>
      <!-- Información operación -->
      <message :message="message" :type="messageType" />

      <form method="POST" action="">
        <!-- Name -->
        <div>
          <v-label for="name">Nombre</v-label>

          <v-input
            id="name"
            class="block mt-1 w-full"
            type="text"
            name="name"
            v-model="user.name"
            required
          />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
          <v-label for="email">Email</v-label>

          <v-input
            id="email"
            class="block mt-1 w-full"
            type="email"
            name="email"
            v-model="user.email"
            required
          />
        </div>

        <!-- Password -->
        <div class="mt-4">
          <v-label for="password">Contraseña</v-label>

          <v-input
            id="password"
            class="block mt-1 w-full"
            type="password"
            name="password"
            v-model="user.password"
            required
          />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
          <v-label for="password_confirmation">Confirmar contraseña</v-label>

          <v-input
            id="password_confirmation"
            class="block mt-1 w-full"
            type="password"
            name="password_confirmation"
            required
          />
        </div>

        <!-- Type -->
        <div class="mt-4">
          <v-label for="type"></v-label>
          <select
            v-model="user.type"
            name="type"
            class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="admin">Administrador</option>
            <option value="user">Socio</option>
          </select>
        </div>

        <!-- Nick -->
        <div class="mt-4">
          <v-label for="nick">Nick</v-label>

          <v-input
            id="nick"
            class="block mt-1 w-full"
            type="text"
            name="nick"
            v-model="user.nick"
            required
          />
        </div>

        <!-- Boton-->
        <div class="mt-4">
          <link-button
            name="Users"
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-4 flex float-left text-white font-bold bg-blue-400 p-4 rounded p-1.5"
          >
            Volver a "Usuarios"
          </link-button>

          <v-button
            class="ml-4 flex float-right text-white font-bold bg-indigo-500 p-4 rounded p-1.5"
            @click.native="save"
          >
            Guardar
          </v-button>
        </div>
      </form>
    </card-sin-logo>
  </div>
</template>

<script>
import axios from "axios";

import cardSinLogo from "../components/card-sin-logo.vue";
import VLabel from "../components/v-label";
import VInput from "../components/v-input";
import VButton from "../components/v-button";
import Validation from "../components/validation.vue";
import LinkButton from "../components/linkButton.vue";
import Message from "../components/message";

export default {
  components: {
    cardSinLogo,
    Message,
    VLabel,
    VInput,
    LinkButton,
    VButton,
    Validation,
  },
  
  data: function () {
    return {
      user: {},
      message: null,
      messageType: null,
      error:{
          name:''
          },
    };
  },
  created() {
    this.$store.commit("SET_TITLE", "Usuarios -> Nuevo Usuario");
  },
 
  methods: {
    save: function () {
      console.log(this.user.password);  
      axios
        .post(`${process.env.VUE_APP_API}/users`,this.user)
        .then((result) => {
          this.messageType = "success";
          this.message = "El usuario ha sido creado correctamente";
        })
        .catch((error) => {
          this.messageType = "error";
          if (error.response) {
            this.message = error.response.data.message;
          } else {
            this.message = "Ha ocurrido un error inesperado";
          }
        });
    },
  },
};
</script>