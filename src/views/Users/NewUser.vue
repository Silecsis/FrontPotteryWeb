<!--
  Vista de nuevo usuario.
  Crea un nuevo user a la api.
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
            class="block mt-1 w-full"
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

          <validation v-if="error.password" :errors="error.password" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
          <v-label for="password_confirmation">Confirmar contraseña</v-label>

          <v-input
            id="password_confirmation"
            class="block mt-1 w-full"
            type="password"
            name="password_confirmation"
            v-model="user.password_confirmation"
            required
          />
          <validation v-if="error.password_confirmation" :errors="error.password_confirmation" />
        </div>

        <!-- Type -->
        <div class="mt-4">
          <v-label for="type">Tipo de usuario</v-label>
          <select
            v-model="user.type"
            name="type"
            class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="null" selected disabled>Seleccione el tipo</option>
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
      user: {type:"null"},
      message: null,
      messageType: null,
      error: {
        name: [],
        email: [],
        type: [],
        nick: [],
        email:[],
        password: [],
        password_confirmation:[],
      },
    };
  },
  created() {
    this.$store.commit("SET_TITLE", "Usuarios -> Nuevo Usuario");
  },

  methods: {
    save: function () {
      if (!this.validate()) {
        return;
      }

      axios
        .post(`${process.env.VUE_APP_API}/users`, this.user)
        .then((result) => {
          this.messageType = "success";
          this.message = "El usuario ha sido creado correctamente";
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
      var passwordUser = this.user.password;
      var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      // var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      var valid = true;

      this.error = {
        name: [],
        email: [],
        type: [],
        nick: [],
        email:[],
        password: [],
        password_confirmation:[],
      };

      if (nameUser.length < 6 || nameUser.length > 255 || !nameUser) {
        this.error.name.push(
          "El campo no puede ser un número, debe tener al menos de 6 carácteres y no más de 255."
        );
        valid = false;
      }

      if (
        emailUser.length < 6 ||
        emailUser.length > 255 ||
        !emailUser ||
        !regexEmail.test(emailUser)
      ) {
        this.error.email.push(
          "El campo debe ser un email válido de al menos de 6 carácteres y máximo 255."
        );
        valid = false;
      }

      if (!passwordUser || passwordUser.length<8) {
        this.error.password.push("El campo debe tener 8 carácteres.");
        valid = false;
      }

      if (!typeUser) {
        this.error.type.push("El campo es obligatorio.");
        valid = false;
      }

      if (nickUser.length < 4 || nickUser.length > 255 || !nickUser) {
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