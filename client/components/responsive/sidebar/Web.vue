<template>
  <v-navigation-drawer permanent fixed app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h5">Walvis</v-list-item-title>
        <v-list-item-subtitle class="mt-2">
          <v-btn small @click.prevent="$router.push('/')">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn small @click.prevent="$router.push('/settings')">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list v-if="containers.length > 0">
      <v-list-item
        v-for="(container, i) in containers"
        :key="i"
        :to="`/logs/${container.id}`"
        router
        exact
      >
        <v-icon>mdi-database</v-icon>
        <v-list-item-title v-text="container.image" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

import Loader from "../../Loader.vue";

export default {
  components: {
    Loader,
  },

  async created() {
    const status = localStorage.getItem("SHOW_DISABLED_CONTAINER") === "NO" ? "running" : "all";
    await this.$store.dispatch("getContainerSideBar", status);
  },

  computed: {
    ...mapGetters({
      containers: "getContainerSideBar",
    }),
  },
};
</script>
