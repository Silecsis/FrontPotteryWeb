<!--Vista Usuarios-->
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
            
            <button
              class="btn btn-outline-success bg-blue-200 border-2 text-gray-500 font-bold border-gray-400 rounded p-2 float-right"
              type="button"
            >
              Buscar
            </button>
          </form>
        </div>
      </nav>

      <link-button
        name="NewMaterial"
        class="text-lg text-gray-600 font-bold bg-yellow-300 border-4 border-gray-400 p-4 rounded p-1.5"
      >
        Nuevo material
      </link-button>

      <!--SELECCION DE PAGINACION-->
      

      <!--TABLA-->
      <div
        class="bg-white overflow-hidden shadow-sm sm:rounded-lg border-2 border-gray-400 p-4"
      >
        <!-- PAGINACION CON VUE-PAGINATE -->
        <paginate ref="paginator" name="materials" :list="materials" :per="4" />
        <paginate-links
          for="materials"
          :limit="2"
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
                Tipo de material
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Temperatura
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                ¿Toxicidad?
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
            v-if="materials.length != 0"
            class="text-gray-500 text-xs divide-y divide-gray-200"
          >
            <tr
              v-for="material in paginated('materials')"
              v-bind:key="material.id"
              class="text-center"
            >
              <td class="py-3">{{ material.name }}</td>
              <td class="py-3">{{ material.type_material }}</td>
              <td class="py-3">{{ material.temperature }}</td>
              <td class="py-3">{{ material.toxic }}</td>
              <td class="py-3">{{ material.created_at }}</td>
              <td class="py-3">
                <div class="flex justify-center space-x-1">
                  <!-- @if($user->id != Auth::user()->id) -->
                  <button-icon
                    type="edit"
                    @click.native="edit(material.id)"
                    class="font-bold"
                  >
                  </button-icon>

                  <button-icon
                    type="remove"
                    @click.native="destroy(material.id)"
                    class="font-bold"
                  >
                  </button-icon>
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
    this.$store.commit("SET_TITLE", "Materiales");
  },
  data: function () {
    return {
      materials: [],
      paginate: ["materials"],
      message: null,
      messageType: null,
      errorTabla: "",
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/materials`)
      .then((result) => {
        this.materials = result.data.filter((material) => {
          material.created_at = material.created_at.substring(0, 10); //Modificacion
          return true; //True porque quiero que me devueva. Si fuera al contrario, pondria false
        });

        if (this.materials.length == 0) {
          this.errorTabla =
            "No existen materiales para este criterio de búsqueda";
        }
      })
      .catch(() => {
        this.errorTabla = "Ha ocurrido un error inesperado";
      });
  },
  methods: {
    destroy: function (id) {
      axios
        .delete(`${process.env.VUE_APP_API}/materials/${id}`)
        .then((result) => {
          if (result.data.success) {
            this.showSuccess(result.data.message);
            this.materials = this.materials.filter((material) => {
              return material.id != id; //Para que no liste el usuario que se ha borrado
            });

            if (this.materials.length == 0) {
              this.errorTabla =
                "No existen materiales para este criterio de búsqueda";
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
      this.$router.push({ name: "EditMaterial", params: { id: id } });
    },
  },
};
</script>
