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
            
          </form>
        </div>
      </nav>

      

      <!--SELECCION DE PAGINACION-->
      <div class="hidden sm:flex mt-8 mb-1">
        
      </div>

      <!--TABLA-->
      <div
        class="bg-white overflow-hidden shadow-sm sm:rounded-lg border-2 border-gray-400 p-4"
      >
        <!-- PAGINACION CON VUE-PAGINATE -->
        <paginate ref="paginator" name="pieces" :list="pieces" :per="4" />
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
                Nombre
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Usuario
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Descripción
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Imagen
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
              <td class="py-3">{{ piece.name }}</td>
              <td class="py-3">{{ piece.emailUser }}</td>
              <td class="py-3">{{ piece.description }}</td>
              <td class="py-3">{{ piece.img }}</td>
              <td class="py-3 flex justify-center">{{ piece.sold }}</td>
              <td class="py-3">{{ piece.created_at }}</td>
              <td class="py-3">
                <div class="flex justify-center space-x-1">
                  <!-- @if($user->id != Auth::user()->id) -->
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
              </td>
            </tr>
          </tbody>

          <tbody v-else class="text-gray-500 text-xs divide-y divide-gray-200">
            <tr class="text-center">
              <td colspan="7" class="py-3 font-bold text-red-600 text-lg">
                {{ errorTabla }}
              </td>
            </tr>
          </tbody>
          <!-- {{$users->appends(request()->all())-->
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

export default {
  components: {
    LinkButton,
    DropdownLink,
    Dropdown,
    NavLink,
    ButtonIcon,
    Message,
  },
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    this.$store.commit("SET_TITLE", "Piezas de cada usuario");
  },
  data: function () {
    return {
      pieces:[],
      paginate: ["pieces"],
      message: null,
      messageType: null,
      errorTabla: "",
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/pieces`)
      .then((result) => {

        this.pieces=result.data.filter((piece) => {
          piece.created_at = piece.created_at.substring(0, 10); //Modificacion
          return true; //True porque quiero que me devueva. Si fuera al contrario, pondria false
        });

        if (this.pieces.length == 0) {
          this.errorTabla =
            "No existen piezas para este criterio de búsqueda";
        }
      })
      .catch(() => {
        this.errorTabla = "Ha ocurrido un error inesperado";
      });
  },
  methods: {
    destroy: function (id) {
      axios
        .delete(`${process.env.VUE_APP_API}/pieces/${id}`)
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
      this.$router.push({ name: "EditPiece", params: { id: id } });
    },
  },
};
</script>
