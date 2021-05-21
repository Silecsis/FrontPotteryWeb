<template>
  <div class="font-sans text-gray-900 antialiased">
    <div
      class="min-h-screen min-w-max flex flex-col sm:justify-center items-center pt-5 bg-blue-100 pb-5"
    >
      <div>
        <link-button name="Dashboard">
          <application-logo class=" fill-current text-gray-500" />
        </link-button>
        <p class="font-sans md:font-serif text-2xl">PotteryWeb</p>
      </div>

      <div
        class="w-full flex flex-col sm:justify-center items-center"
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