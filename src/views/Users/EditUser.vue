<!--Vista Usuarios-->
<template>
  <div>
    <!-- <x-guest-layout> -->
    <card-sin-logo>
      <!-- Información operación -->
      <message :message="message" :type="messageType" />

      <form method="POST" action="">
        <!-- Name -->
        <div>
          <v-label for="name">Nombre</v-label>

          <v-input
            id="name"
            class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            name="name"
            v-model="user.name"
            required
          />

          <validation v-if="error.name" :error="error.name" />
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

        <!-- Type -->
        <div class="mt-4">
          <v-label for="type">Tipo de usuario</v-label>
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
    <!-- </x-guest-layout> -->
  </div>
</template>

<script>
import axios from "axios";

import CardSinLogo from "../components/card-sin-logo";
import Message from "../components/message";
import VLabel from "../components/v-label";
import VInput from "../components/v-input";
import LinkButton from "../components/linkButton.vue";
import VButton from "../components/v-button";
import Validation from "../components/validation.vue";

export default {
  components: {
    CardSinLogo,
    Message,
    VLabel,
    VInput,
    LinkButton,
    VButton,
    Validation,
  },
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.$store.commit("SET_TITLE", "Usuarios -> Editar Usuario");
  },
  data: function () {
    return {
      user: {},
      message: null,
      messageType: null,
      id: "",
      error:{
          name:''
          },
    };
  },
  mounted() {
    var id = this.$route.params.id;
    axios
      .get(`${process.env.VUE_APP_API}/users/${id}`)
      .then((result) => {
        this.user = result.data.data;
      })
      .catch(() => {
        this.users = [];
        this.errorTabla = "Ha ocurrido un error inesperado";
      });
  },
  methods: {
    save: function () {
      var id = this.$route.params.id;

      if (this.user.name.length == 0) {
        this.error.name = "Campo obligatorio";
        return;
      }

      axios
        .put(`${process.env.VUE_APP_API}/users/${id}`, this.user)
        .then((result) => {
          this.messageType = "success";
          this.message = "El usuario ha sido modificado correctamente";
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
