<template>
  <v-app dark>
    <Sidebar :drawer="drawer" />
    <Appbar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Appbar from "../components/Appbar.vue";

export default {
  name: "DefaultLayout",

  components: {
    Sidebar,
    Appbar,
  },

  async created() {
    if (!("LOG_MODE" in localStorage))
      localStorage.setItem("LOG_MODE", "STREAM");

    if (!("TIME_STAMP" in localStorage))
      localStorage.setItem("TIME_STAMP", "SHOW");

    if (!("SHOW_DISABLED_CONTAINER" in localStorage))
      localStorage.setItem("SHOW_DISABLED_CONTAINER", "NO");

    if (!("DARK_MODE" in localStorage)) localStorage.setItem("DARK_MODE", "NO");
  },

  data() {
    return {
      title: "Walvis",
      drawer: true,
    };
  },
};
</script>
