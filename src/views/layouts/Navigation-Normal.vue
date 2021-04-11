<template>
  <!-- Primary Navigation Menu -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <a href="javascript:void(0)" @click="$router.push('/')">
            <application-logo
              size="small"
              class="block h-10 w-auto fill-current text-gray-600"
            />
          </a>
        </div>

        <!-- Navigation Links -->
        <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
          <!--HOME-->
          <nav-link name="Dashboard" class="font-bold"> Home </nav-link>

          <!--Usuarios. SOLO SI ES ADMIN-->
          <nav-link v-rol:admin="user" name="Users" class="font-bold">
            Usuarios
          </nav-link>

          <!--Materials-->
          <nav-link v-if="user" name="Materials" class="font-bold">
            Materiales
          </nav-link>

          <!--Pieces-->
          <nav-link name="Pieces" class="font-bold">
            Piezas cerámicas
          </nav-link>

          <!--Sales-->
          <nav-link name="Sales" class="font-bold">
            Ventas realizadas
          </nav-link>
        </div>
      </div>

      <!-- Settings Dropdown -->
      <div v-if="user" class="hidden sm:flex sm:items-center sm:ml-6">
        <dropdown align="right">
          <template v-slot:trigger>
            <button
              class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
            >
              <!-- <div>{{ Auth::user()->name }}</div> -->
              <div>{{ user.name }}</div>

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
            <!-- Mis piezas -->
            <dropdown-link name="MyPieces">
              Mis piezas cerámicas
            </dropdown-link>

            <!-- Mis ventas -->
            <dropdown-link @click.native="mySales(user.id)">
              Mis ventas realizadas
            </dropdown-link>

            <!-- Edita mi perfil -->
            <dropdown-link @click.native="editProfile(user.id)">
              Editar mi perfil
            </dropdown-link>

            <!-- LOGOUT -->
            <dropdown-link @click.native="logout"> Salir </dropdown-link>
          </template>
        </dropdown>

        <image-server
          type="avatar"
          :id="user.id"
          :params="{
            alt: 'Imagen de perfil',
            class: 'ml-1 rounded-full w-10 h-10 mr-4 shadow-lg',
            width: '48',
            height: '48',
          }"
        />
      </div>

      <div v-else>
        <v-button class="mt-4" @click.native="logIn">Log in</v-button>
      </div>

      <!-- Hamburger -->
      <div class="-mr-2 flex items-center sm:hidden">
        <button
          x-on:click="open = !open"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
        >
          <svg
            class="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              x-bind:class="{ hidden: open, 'inline-flex': !open }"
              class="inline-flex"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              x-bind:class="{ hidden: !open, 'inline-flex': open }"
              class="hidden"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ApplicationLogo from "../components/application-logo.vue";
import NavLink from "../components/nav-link.vue";
import Dropdown from "../components/dropdown.vue";
import DropdownLink from "../components/dropdown-link.vue";
import VButton from "../components/v-button.vue";
import ImageServer from "../components/image-server.vue";

export default {
  components: {
    ApplicationLogo,
    NavLink,
    Dropdown,
    DropdownLink,
    VButton,
    ImageServer,
  },
  data: function () {
    return {
      user: null,
    };
  },
  methods: {
    logIn: function () {
      this.$router.push({ name: "Login" });
    },

    logout: function () {
      sessionStorage.clear();
      if (this.$route.name == "Dashboard") {
        this.$router.go(0);
      } else {
        this.$router.push({ name: "Dashboard" });

        this.user = null;
      }
    },
    editProfile: function (id) {
      this.$router.push({ name: "EditProfile", params: { id: id } });
    },
    mySales: function (id) {
      this.$router.push({ name: "MySales", params: { idUser: id } });
    },
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
};
</script>