<template>
  <div v-if="$mq === 'lg'">
    <v-app>
      <Sidebar />
      <v-app-bar fixed app dense> </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
  <div v-else>
    <p class="text-h4">Open in a laptop or computer</p>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "DefaultLayout",

  components: {
    Sidebar,
  },

  async created() {
    if (!('LOG_MODE' in localStorage))
      localStorage.setItem("LOG_MODE", "STREAM");

    if (!('TIME_STAMP' in localStorage))
      localStorage.setItem("TIME_STAMP", "SHOW");

    if (!('SHOW_DISABLED_CONTAINER' in localStorage))
      localStorage.setItem("SHOW_DISABLED_CONTAINER", "NO");
  },

  data() {
    return {
      title: "Walvis",
    };
  },
};
</script>
