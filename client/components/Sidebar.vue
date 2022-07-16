<template>
  <v-navigation-drawer v-model="drawer" app clipped flat>
    <v-row>
      <v-col lg="12">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle
              v-if="$route && $route.fullPath === '/'"
            >
              HOME
            </v-list-item-subtitle>
            <v-list-item-subtitle
              v-if="$route && $route.fullPath === '/settings'"
            >
              SETTINGS
            </v-list-item-subtitle>
            <v-list-item-subtitle
              v-if="$route && $route.fullPath.includes('/container')"
            >
              CONTAINERS
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-list nav dense v-if="$route && ($route.fullPath.includes('/container'))">
      <v-list-item-group>
        <v-list-item
          v-for="(container, i) of containerList"
          :key="i"
          @click="getContainerLogs(container)"
        >
          <v-list-item-title>
            {{ container.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  props: ["socketObject"],

  async created() {
    await this.$store.dispatch("listContainerAction");
  },

  data() {
    return {
      drawer: true,
    };
  },

  computed: {
    ...mapGetters({
      loadingLogs: "getLoadingLogs",
      containerList: "getContainerList",
    }),
  },

  methods: {
    async getContainerLogs(container) {
      this.$router.push(`/container/${container.id}`);
    },

    async stopLoggingContainer() {
      this.socketObject.emit("closeLogger");
      await this.$store.dispatch("clearAllLogs");
    },

    redirectTo(path) {
      this.socketObject.emit('closeLogger');
      this.$router.push(path);
    }
  },
};
</script>
