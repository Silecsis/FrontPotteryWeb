<template>
    <!-- Responsive Navigation Menu -->
    <div x-bind:class="{ block: open, hidden: !open }" class="hidden sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <!-- Navigation Links -->
        <!--HOME-->
        <nav-link name="Dashboard" responsive="true" class="font-bold">
          Home
        </nav-link>

        <!--SOLO SI ES ADMIN-->
        <!--Usuarios-->
        <nav-link name="Users" responsive="true" class="font-bold">
          Usuarios
        </nav-link>

        <!--Materials-->
        <nav-link name="Materials" responsive="true" class="font-bold">
          Materiales
        </nav-link>

        <!--Mis piezas-->
        <nav-link name="MyPieces" responsive="true" class="font-bold">
          Mis piezas
        </nav-link>

        <!--Mis ventas-->
        <nav-link name="MySales" responsive="true" class="font-bold">
          Mis ventas
        </nav-link>
      </div>

      <!-- Responsive Settings Options -->
      <div class="pt-4 pb-1 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <svg
              class="h-10 w-10 fill-current text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <div class="ml-3">
            <div class="font-medium text-base text-gray-800">NombreUser</div>
            <div class="font-medium text-sm text-gray-500">EmailUser</div>
          </div>
        </div>

        <div class="mt-3 space-y-1">
          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <dropdown align="right" width="48">
              <template v-slot:trigger>
                <button
                  class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                >
                  <div>UserName</div>

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
                <!-- Edita mi perfil -->
                <dropdown-link name="EditProfile">
                  Editar mi perfil
                </dropdown-link>

                <!-- Authentication -->
                <!-- TODO:form -->
                <!-- LOGOUT -->
                <dropdown-link name="Login"> Salir </dropdown-link>
              </template>
            </dropdown>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ApplicationLogo from "../components/application-logo.vue";
import NavLink from "../components/nav-link.vue";
import Dropdown from "../components/dropdown.vue";
import DropdownLink from "../components/dropdown-link.vue";

export default {
  components: {
    ApplicationLogo,
    NavLink,
    Dropdown,
    DropdownLink,
  },
};
</script>