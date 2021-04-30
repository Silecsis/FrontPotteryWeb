<!--Vista piezas de cada usuario.
El admin puede ver, borrar y editar la pieza.-->
<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <!-- <x-message-status-success class="mb-4" :status="session('status')" /> -->
      <message :message="message" :type="messageType" />

      <nav class="navbar navbar-light py-6 mb-4">
        <div class="bg-white py-4 px-2 rounded border-2 border-gray-300">
          <div class="flex bg-blue-400 rounded pt-4">
            <h4 class="pb-4 m-auto text-white font-bold text-lg">
              Cuadro de búsqueda
            </h4>
          </div>
          <form class="form-inline pt-4" method="GET">
            <!--Lista todas piezas:-->
            <label for="buscaPiece" class="ml-4">Buscar por nombre:</label>
            <select
              name="buscaNombre"
              class="form-control ml-2 mr-sm-2 rounded bg-gray-200"
              v-model="searchForm.buscaNombre"
            >
              <option value="">Todos</option>
              <option
                v-for="piece in pieces"
                v-bind:key="piece.id"
                :value="piece.name"
              >
                {{ piece.name }}
              </option>
            </select>

            <select
              name="buscaVendido"
              class="form-control ml-2 mr-sm-2 rounded bg-gray-200"
              v-model="searchForm.buscaVendido"
            >
              <option disabled value="">¿Vendido?</option>
              <option value="">Todos</option>
              <option value="no">No vendido</option>
              <option value="si">Vendido</option>
            </select>

            <input
              name="buscaFechaLogin"
              class="form-control ml-2 mr-sm-2 rounded bg-gray-200"
              type="date"
              placeholder="Por fecha de creación"
              aria-label="Search"
              v-model="searchForm.buscaFechaLogin"
            />

            <button
              class="btn btn-outline-success bg-blue-200 border-2 text-gray-500 font-bold border-gray-400 rounded p-2 float-right"
              type="button"
              @click="search"
            >
              Buscar
            </button>
          </form>
        </div>
      </nav>

      <link-button
        name="NewMyPiece"
        class="text-lg text-gray-600 font-bold bg-yellow-300 border-4 border-gray-400 p-4 rounded p-1.5"
      >
        Nueva pieza
      </link-button>
      

      <!--SELECCION DE PAGINACION-->
      <div class="hidden sm:flex mt-8 mb-1">
        <dropdown>
          <template v-slot:trigger>
            <button
              class="flex items-center bg-white mr-sm-2 px-6 rounded text-gray-600 font-bold border-2 border-gray-400"
            >
              Mostrar {{ pageSize }} por página
              <div class="ml-1">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </template>
          <template v-slot:content>
            <dropdown-link @click.native="pageSize = 4">
              Paginación de 4
            </dropdown-link>
            <dropdown-link @click.native="pageSize = 6">
              Paginación de 6
            </dropdown-link>
            <dropdown-link @click.native="pageSize = 8">
              Paginación de 8
            </dropdown-link>
            <dropdown-link @click.native="pageSize = 10">
              Paginación de 10
            </dropdown-link>
          </template>
        </dropdown>
      </div>

      <!--TABLA-->
      <div
        class="bg-white overflow-hidden shadow-sm sm:rounded-lg border-2 border-gray-400 p-4"
      >
        <!-- PAGINACION CON VUE-PAGINATE -->
        <paginate
          ref="paginator"
          name="pieces"
          :list="pieces"
          :per="pageSize"
        />
        <paginate-links
          for="pieces"
          :limit="4"
          :show-step-links="true"
        ></paginate-links>

        <table
          class="overflow-x-auto overflow-y-auto w-full bg-white divide-y divide-gray-200 mt-4"
        >
          <thead class="bg-blue-300">
            <tr class="divide-x">
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Imagen
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Nombre
              </th>

              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Descripción
              </th>

              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                ¿Vendida?
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Fecha creación
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody
            v-if="pieces.length != 0"
            class="text-gray-500 text-xs divide-y divide-gray-200"
          >
            <tr
              v-for="piece in paginated('pieces')"
              v-bind:key="piece.id"
              class="text-center"
            >
              <td class="py-3 flex justify-center">
                <image-server
                  :params="{
                    width: '48',
                    height: '48',
                    class: 'rounded w-20 h-20 shadow-lg',
                    alt: 'imagen pieza',
                  }"
                  type="img"
                  :id="piece.id"
                />
              </td>
              <td class="py-3">{{ piece.name }}</td>
              <td class="py-3">{{ piece.description }}</td>
              <td
                v-if="piece.sold == 1"
                class="py-3 bg-green-500 text-white font-bold"
              >
                Vendida
              </td>
              <td v-else class="py-3 bg-green-100 font-bold">No vendida</td>
              <td class="py-3">{{ piece.created_at }}</td>
              <td class="py-3">
                <div class="flex justify-center space-x-1">
                  <button-icon
                    type="edit"
                    @click.native="edit(piece.id)"
                    class="font-bold"
                  >
                  </button-icon>

                  <button-icon
                    type="remove"
                    @click.native="destroy(piece.id)"
                    class="font-bold"
                  >
                  </button-icon>
                </div>
                <div class="flex justify-center space-x-1">
                  <link-button
                    @click.native="detail(piece.id)"
                    class="text-sm text-white font-bold bg-purple-500 ml-4 p-4 rounded p-1.5"
                  >
                    Ver en detalle
                  </link-button>
                </div>
              </td>
            </tr>
          </tbody>

          <tbody v-else class="text-gray-500 text-xs divide-y divide-gray-200">
            <tr class="text-center">
              <td colspan="6" class="py-3 font-bold text-red-600 text-lg">
                {{ errorTabla }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import LinkButton from "../components/linkButton.vue";
import Dropdown from "../components/dropdown";
import DropdownLink from "../components/dropdown-link";
import NavLink from "../components/nav-link";
import ButtonIcon from "../components/button-icon";
import Message from "../components/message";
import ImageServer from "../components/image-server.vue";

export default {
  components: {
    LinkButton,
    DropdownLink,
    Dropdown,
    NavLink,
    ButtonIcon,
    Message,
    ImageServer,
  },
  created() {
    this.$store.commit("SET_TITLE", "Mis piezas cerámicas");
  },
  data: function () {
    return {
      pieces: [],
      paginate: ["pieces"],
      message: null,
      messageType: null,
      errorTabla: "",
      user: null,
      pageSize: 4,
      searchForm: {},
    };
  },
  mounted() {
    this.searchForm = { buscaNombre:"" ,buscaVendido: "" };
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.search();
  },
  methods: {
    destroy: function (id) {
      axios
        .delete(`${process.env.VUE_APP_API}/mypieces/${this.user.id}/${id}`)
        .then((result) => {
          if (result.data.success) {
            this.showSuccess(result.data.message);
            this.pieces = this.pieces.filter((piece) => {
              return piece.id != id; //Para que no liste el usuario que se ha borrado
            });

            if (this.pieces.length == 0) {
              this.errorTabla =
                "No existen piezas para este criterio de búsqueda";
            }
          } else {
            this.showError(result.data.message);
          }
        })
        .catch((error) => {
          if (error.response) {
            this.showError(error.response.data.message);
          } else {
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
    edit: function (id) {
      this.$router.push({ name: "EditMyPiece", params: { idUser:this.user.id,id: id } });
    },
    detail: function (id) {
      this.$router.push({ name: "DetailPiece", params: { id: id } });
    },
    search: function () {
      let config = {
        params: this.searchForm,
      };

      axios
        .get(`${process.env.VUE_APP_API}/mypieces/${this.user.id}`, config)
        .then((result) => {
          this.pieces = result.data.pieces.filter((piece) => {
            piece.created_at = piece.created_at.substring(0, 10); //Modificacion
            return true; //True porque quiero que me devueva. Si fuera al contrario, pondria false
          });

          if (this.pieces.length == 0) {
            this.errorTabla =
              "No existen piezas para este criterio de búsqueda";
          }
        })
        .catch((error) => {
          if (error.response.data.message == "Unauthenticated.") {
            this.showError("No estás autorizado para esta vista");
            this.$store.commit("SET_TITLE", "Ventas realizadas --> Error");
            this.auth = false;
          } else {
            this.sales = [];
            this.errorTabla = "Ha ocurrido un error inesperado";
          }
        });
    },
  },
};
</script>
