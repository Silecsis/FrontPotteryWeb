<template>
  <div>
    <card>
      <!-- Información operación -->
      <message :message="message" :type="messageType" />
      <template v-slot:logo>
        <div class="flex justify-center space-x-1">
          <div class="bg-white rounded p-4">IMAGEN</div>
        </div>
      </template>

      <form method="POST">
        <!-- Name -->
        <div>
          <v-label for="name">Nombre</v-label>

          <v-input
            id="name"
            class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            name="name"
            v-model="piece.name"
            required
          />
        </div>

        <!-- Description -->
        <div div class="mt-4">
          <v-label for="description">Descripción</v-label>

          <v-input
            id="description"
            class="block mt-1 w-full"
            type="text"
            name="description"
            v-model="piece.description"
            required
          />
        </div>

        <!-- Imagen Nueva-->

        <!-- Vendida -->
        <div class="mt-4">
          <v-label for="sold">¿Vendida?</v-label>
          <select
            v-model="piece.sold"
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
            name="Pieces"
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-4 flex float-left text-white font-bold bg-blue-400 p-4 rounded p-1.5"
          >
            Volver a "Piezas de cada usuario"
          </link-button>

          <v-button
            class="ml-4 flex float-right text-white font-bold bg-indigo-500 p-4 rounded p-1.5"
            @click.native="save"
          >
            Guardar
          </v-button>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
import axios from "axios";

import Card from "../components/card";
import Message from "../components/message";
import VLabel from "../components/v-label";
import VInput from "../components/v-input";
import LinkButton from "../components/linkButton.vue";
import VButton from "../components/v-button";
import Validation from "../components/validation.vue";

export default {
  components: {
    Card,
    Message,
    VLabel,
    VInput,
    LinkButton,
    VButton,
    Validation,
  },
  created() {
    this.$store.commit("SET_TITLE", "Piezas cerámicas -> Editar pieza");
  },
  data: function () {
    return {
      piece: {},
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
      .get(`${process.env.VUE_APP_API}/pieces/${id}`)
      .then((result) => {
        this.piece = result.data.data;
      })
      .catch(() => {
        this.errorTabla = "Ha ocurrido un error inesperado";
      });
  },
  methods: {
    save: function () {
      var id = this.$route.params.id;

      if (this.piece.name.length == 0) {
        this.error.name = "Campo obligatorio";
        return;
      }

      axios
        .put(`${process.env.VUE_APP_API}/pieces/${id}`, this.piece)
        .then((result) => {
          this.messageType = "success";
          this.message = "La pieza ha sido modificada correctamente";
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
