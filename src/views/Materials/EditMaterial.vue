<template>
  <div>
    <card-sin-logo>
      <!-- Información operación -->
      <message :message="message" :type="messageType" />

      <form method="POST">
        <!-- Name -->
        <div>
          <v-label for="name">Nombre</v-label>

          <v-input
            id="name"
            class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            name="name"
            v-model="material.name"
            required
          />
        </div>

        <!-- Tipo de material -->
        <div div class="mt-4">
          <v-label for="name">Tipo de material</v-label>

          <v-input
            id="name"
            class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            name="name"
            v-model="material.type_material"
            required
          />
        </div>

        <!-- Temperature -->
        <div class="mt-4">
          <!--No es una errata, se escribe cocción. Es una propiedad en los materiales de ceramica-->
          <v-label for="temperatura">Temperatura de cocción</v-label>

          <v-input
            v-model="material.temperature"
            id="temperatura"
            class="block mt-1 w-full"
            type="number"
            name="temperature"
            required
          />
        </div>

        <!-- Toxic -->
        <div class="mt-4">
          <v-label for="sold">¿Tóxico?</v-label>
          <select
            v-model="material.toxic"
            name="sold"
            id="sold"
            class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="0">No</option>
            <option value="1">Si</option>
          </select>
        </div>

        <div class="mt-4">
          <link-button
            name="Materials"
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-4 flex float-left text-white font-bold bg-blue-400 p-4 rounded p-1.5"
          >
            Volver a "Materiales"
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

import Message from "../components/message";
import VLabel from "../components/v-label";
import VInput from "../components/v-input";
import LinkButton from "../components/linkButton.vue";
import VButton from "../components/v-button";
import Validation from "../components/validation.vue";
import CardSinLogo from "../components/card-sin-logo.vue";

export default {
  components: {
    Message,
    VLabel,
    VInput,
    LinkButton,
    VButton,
    Validation,
    CardSinLogo,
  },
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.$store.commit("SET_TITLE", "Materiales -> Editar material");
  },
  data: function () {
    return {
      material: {},
      message: null,
      messageType: null,
      id: "",
      error: {
        name: "",
      },
    };
  },
  mounted() {
    var id = this.$route.params.id;
    axios
      .get(`${process.env.VUE_APP_API}/materials/${id}`)
      .then((result) => {
        this.material = result.data.data;
      })
      .catch(() => {
        this.errorTabla = "Ha ocurrido un error inesperado";
      });
  },
  methods: {
    save: function () {
      var id = this.$route.params.id;

      if (this.material.name.length == 0) {
        this.error.name = "Campo obligatorio";
        return;
      }

      axios
        .put(`${process.env.VUE_APP_API}/materials/${id}`, this.material)
        .then((result) => {
          this.messageType = "success";
          this.message = "El material ha sido modificado correctamente";
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