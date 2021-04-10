<!--
  Vista de edición de usuario.
  Edita a los usuarios de la api.
  Solo puede acceder los usuarios de tipo admin.
-->
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
            class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            name="name"
            v-model="user.name"
            required
          />

          <validation v-if="error.name" :errors="error.name" />
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

          <validation v-if="error.email" :errors="error.email" />
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

          <validation v-if="error.type" :errors="error.type" />
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

          <validation v-if="error.nick" :errors="error.nick" />
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
    this.$store.commit("SET_TITLE", "Usuarios -> Editar Usuario");
  },
  data: function () {
    return {
      user: {},
      message: null,
      messageType: null,
      id: "",
      error: {
        name: [],
        email: [],
        type: [],
        nick: [],
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

      if (!this.validate()) {
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
          if (error.response.data.errors) {
            for (let fieldError in error.response.data.errors) {
              this.error[fieldError] = error.response.data.errors[fieldError];
            }
          } else if (error.response) {
            this.message = error.response.data.message;
          } else {
            this.message = "Ha ocurrido un error inesperado";
          }
        });
    },
    validate: function () {
      var nameUser = this.user.name;
      var emailUser = this.user.email;
      var nickUser = this.user.nick;
      var typeUser = this.user.type;
      var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      var valid = true;
      this.error = {
        name: [],
        email: [],
        type: [],
        nick: [],
      };

      if (!nameUser || nameUser.length < 6 || nameUser.length > 255) {
        this.error.name.push(
          "El campo no puede ser un número, debe tener al menos de 6 carácteres y no más de 255."
        );
        valid = false;
      }

      if (!emailUser ||
        emailUser.length < 6 ||
        emailUser.length > 255 ||
        !regexEmail.test(emailUser)
      ) {
        this.error.email.push(
          "El campo debe ser un email válido de al menos de 6 carácteres y máximo 255."
        );
        valid = false;
      }

      if (!typeUser) {
        this.error.type.push("El campo es obligatorio.");
        valid = false;
      }

      if (!nickUser || nickUser.length < 4 || nickUser.length > 255 ) {
        this.error.nick.push(
          "El campo debe tener al menos 4 carácteres y no más de 255."
        );
        valid = false;
      }

      return valid;
    },
  },
};
</script>
