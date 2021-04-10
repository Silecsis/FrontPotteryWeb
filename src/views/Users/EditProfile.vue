<!--
  Vista de edición de perfil.
  Edita al usuario que está logado.
  Accederá el usuario logado con sus datos.
-->
<template>
  <div>
    <card-sin-logo>
      <!-- Información operación -->
      <message :message="message" :type="messageType" />

      <div v-if="auth">
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
            <validation
              v-if="error.password_confirmation"
              :errors="error.password_confirmation"
            />
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
            <v-button
              class="ml-4 flex float-right text-white font-bold bg-indigo-500 p-4 rounded p-1.5"
              @click.native="save"
            >
              Guardar
            </v-button>
          </div>
        </form>
      </div>
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
    this.$store.commit("SET_TITLE", "Editar mi perfil");
  },
  data: function () {
    return {
      user: {},
      message: null,
      messageType: null,
      id: "",
      auth: true,
      error: {
        name: [],
        email: [],
        password: [],
        password_confirmation: [],
        nick: [],
      },
    };
  },
  mounted() {
    var id = this.$route.params.id;
    axios
      .get(`${process.env.VUE_APP_API}/users/profile/${id}`)
      .then((result) => {
        this.user = result.data.data;
      })
      .catch((error) => {
        if (error.response.data.error == "Unauthorised") {
          this.showError("No puedes editar el perfil de otro usuario");
          this.$store.commit("SET_TITLE", "Editar perfil --> Error");
          this.auth = false;
        } else {
          this.users = [];
          this.errorTabla = "Ha ocurrido un error inesperado";
        }
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
          this.message = "Se han guardado los cambios de su perfil";
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
      var passwordUser = this.user.password;
      var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      var valid = true;
      this.error = {
        name: [],
        email: [],
        password: [],
        nick: [],
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

      if (!passwordUser || passwordUser.length < 8) {
        this.error.password.push("El campo debe tener 8 carácteres.");
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
