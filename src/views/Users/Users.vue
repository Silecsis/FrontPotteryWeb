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
            <input
              name="buscaNombre"
              class="form-control mr-sm-2 rounded bg-gray-200 w-40"
              type="search"
              placeholder="Por nombre"
              aria-label="Search"
            />
            <input
              name="buscaEmail"
              class="form-control ml-2 mr-sm-2 rounded bg-gray-200"
              type="search"
              placeholder="Por email"
              aria-label="Search"
            />
            <input
              name="buscaNick"
              class="form-control ml-2 mr-sm-2 rounded bg-gray-200 w-40"
              type="search"
              placeholder="Por nick"
              aria-label="Search"
            />
            <input
              name="buscaFechaLogin"
              class="form-control ml-2 mr-sm-2 rounded bg-gray-200"
              type="date"
              placeholder="Por fecha de creación"
              aria-label="Search"
            />

            <label for="tipo" class="ml-4">Tipo de usuario:</label>
            <select
              name="buscaTipo"
              class="form-control mr-sm-2 rounded bg-gray-200"
            >
              <option value="0">Todos</option>
              <option value="admin">Administrador</option>
              <option value="user">Socio</option>
            </select>
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
        name="NewUser"
        class="text-lg text-gray-600 font-bold bg-yellow-300 border-4 border-gray-400 p-4 rounded p-1.5"
      >
        Nuevo usuario
      </link-button>

      <link-button
        name="Pieces"
        class="text-lg text-white font-bold bg-indigo-500 ml-4 p-4 rounded p-1.5"
      >
        Piezas usuario.
      </link-button>

      <link-button
        name="Sales"
        class="text-lg text-white font-bold bg-indigo-500 ml-4 p-4 rounded p-1.5"
      >
        Ventas usuario
      </link-button>

      <!--SELECCION DE PAGINACION-->
      <div class="hidden sm:flex mt-8 mb-1">
        <dropdown>
          <template v-slot:trigger>
            <button
              class="flex items-center bg-white mr-sm-2 px-6 rounded text-gray-600 font-bold border-2 border-gray-400"
            >
              Usarios x página
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
            <dropdown-link name="Users"> Paginación de 4 </dropdown-link>
            <dropdown-link name="Users"> Paginación de 6 </dropdown-link>
            <dropdown-link name="Users"> Paginación de 8 </dropdown-link>
            <dropdown-link name="Users"> Paginación de 10 </dropdown-link>
          </template>
        </dropdown>
      </div>

      <!--TABLA-->
      <div
        class="bg-white overflow-hidden shadow-sm sm:rounded-lg border-2 border-gray-400 p-4"
      >
        <!-- PAGINACION CON VUE-PAGINATE -->
        <paginate ref="paginator" name="users" :list="users" :per="2" />
        <paginate-links
          for="users"
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
                Email
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Tipo
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Nick
              </th>
              <th
                class="px-3 py-2 text-xs font-medium text-gray-700 font-bold uppercase"
              >
                Imagen
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
            v-if="users.length != 0"
            class="text-gray-500 text-xs divide-y divide-gray-200"
          >
            <tr
              v-for="user in paginated('users')"
              v-bind:key="user.id"
              class="text-center"
            >
              <td class="py-3">{{ user.name }}</td>
              <td class="py-3">{{ user.email }}</td>
              <td class="py-3">{{ user.type }}</td>
              <td class="py-3">{{ user.nick }}</td>
              <td class="py-3 flex justify-center">{{ user.img }}</td>
              <td class="py-3">{{ user.created_at }}</td>
              <td class="py-3">
                <div class="flex justify-center space-x-1">
                  <!-- @if($user->id != Auth::user()->id) -->
                  <button-icon
                    type="edit"
                    @click.native="edit(user.id)"
                    class="font-bold"
                  >
                  </button-icon>

                  <button-icon
                    type="remove"
                    @click.native="destroy(user.id)"
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
    this.$store.commit("SET_TITLE", "Usuarios");
  },
  data: function () {
    return {
      users: [],
      paginate: ["users"],
      message: null,
      messageType: null,
      errorTabla: "",
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/users`)
      .then((result) => {
        this.users = result.data.filter((user) => {
          user.created_at = user.created_at.substring(0, 10); //Modificacion
          return true; //True porque quiero que me devueva. Si fuera al contrario, pondria false
        });

        if (this.users.length == 0) {
          this.errorTabla =
            "No existen usuarios para este criterio de búsqueda";
        }
      })
      .catch(() => {
        this.users = [];
        this.errorTabla = "Ha ocurrido un error inesperado";
      });
  },
  methods: {
    destroy: function (id) {
      axios
        .delete(`${process.env.VUE_APP_API}/users/${id}`)
        .then((result) => {
          if (result.data.success) {
            this.showSuccess(result.data.message);
            this.users = this.users.filter((user) => {
              return user.id != id; //Para que no liste el usuario que se ha borrado
            });

            if (this.users.length == 0) {
              this.errorTabla =
                "No existen usuarios para este criterio de búsqueda";
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
      this.$router.push({ name: "EditUser", params: { id: id } });
    },
  },
};
</script>
