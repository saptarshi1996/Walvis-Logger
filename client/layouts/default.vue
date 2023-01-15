<template>
  <v-app dark>
    <Sidebar :drawer="drawer" />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "DefaultLayout",

  middleware: "unauth",

  components: {
    Sidebar,
  },

  mounted() {
    this.$vuetify.theme.dark = localStorage.getItem("DARK_MODE") === "YES";
  },

  async created() {

    // Check if the instances are present to connect.
    if ('instances' in localStorage) {
      const instances = localStorage.getItem('instances');
      const instanceList = JSON.parse(instances);
      if (instanceList.length === 0) {
        this.$router.push('/instances');
        return;
      }
    }

    if (
      "instanceSet" in localStorage &&
      localStorage.getItem("instanceSet") === "TRUE"
    ) {
      if (!("LOG_MODE" in localStorage))
        localStorage.setItem("LOG_MODE", "STREAM");

      if (!("TIME_STAMP" in localStorage))
        localStorage.setItem("TIME_STAMP", "SHOW");

      if (!("SHOW_DISABLED_CONTAINER" in localStorage))
        localStorage.setItem("SHOW_DISABLED_CONTAINER", "NO");

      if (!("DARK_MODE" in localStorage))
        localStorage.setItem("DARK_MODE", "NO");
    } else {
      this.$router.push("/instances");
    }
  },

  data() {
    return {
      title: "Walvis",
      drawer: true,
    };
  },
};
</script>
