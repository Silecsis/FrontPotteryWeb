<template>
  <!-- x-data="{ open: false }" -->
  <nav class="bg-gray-100 border-b border-gray-300">
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
            <nav-link name="Dashboard"
              class="font-bold"
            >
              Home
            </nav-link>

            <!--SOLO SI ES ADMIN-->
                        <!--Usuarios-->
                        <nav-link  name="Users"  class="font-bold" >
                            Usuarios
                        </nav-link>
          <!--Materials-->
            <nav-link name="Materials"
              class="font-bold"
            >
              Materiales
            </nav-link>

          <!--Mis piezas-->
            <nav-link name="MyPieces"
              class="font-bold"
            >
              Mis piezas
            </nav-link>

          <!--Mis ventas-->
            <nav-link name="MySales"
              class="font-bold"
            >
              Mis ventas
            </nav-link>
           
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ApplicationLogo from "../components/application-logo.vue";
import NavLink from "../components/nav-link.vue";

export default {
  components: {
    ApplicationLogo,
    NavLink,
  },
};
</script>