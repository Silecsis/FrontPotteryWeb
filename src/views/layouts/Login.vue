<template>
  <div class="font-sans text-gray-900 antialiased">
    <div
      class="min-h-screen flex flex-col sm:justify-center items-center pt-0 bg-blue-100"
    >
      <div>
        <link-button name="Dashboard">
          <application-logo class=" fill-current text-gray-500" />
        </link-button>
        <p class="font-sans md:font-serif text-2xl">PotteryWeb</p>
      </div>

      <div
        class="w-full sm:max-w-md mt-4 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import LinkButton from "../components/linkButton.vue";
import ApplicationLogo from "../components/application-logo";

export default {
  components:{
    LinkButton,
    ApplicationLogo,
  },
}
</script>