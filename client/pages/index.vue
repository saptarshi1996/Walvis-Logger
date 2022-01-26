<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        v-if="$mq == 'sm'"
        @click.stop="$refs.drawer.drawer = !$refs.drawer.drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>

      <v-btn icon @click.prevent="refreshAllData">
        <v-icon dark>mdi-refresh</v-icon>
      </v-btn>
      <v-btn icon @click.prevent="openExportCsvModal">
        <v-icon dark>mdi-file-excel</v-icon>
      </v-btn>
      <v-btn icon @click.prevent="openExportJsonModal" class="mr-2">
        <v-icon dark>mdi-code-json</v-icon>
      </v-btn>
    </v-app-bar>
    <ContainerDrawer
      :containerList="containerList"
      :containerListLoading="containerListLoading"
      ref="drawer"
    />

    <v-main>
      <v-row>
        <v-col cols="12" v-if="!firstLoaded" class="text-center mt-5">
          <h2>Select a container to view logs</h2>
        </v-col>
        <v-col cols="12" v-if="loading" class="text-center mt-12">
          <TabLoader />
        </v-col>
        <v-col cols="12" v-else>
          <template v-if="mode === 'logs'">
            <ContainerLogs />
          </template>
          <template v-if="mode === 'stats'">
            <ContainerStatsDisplay />
          </template>
        </v-col>
      </v-row>
    </v-main>

    <!-- Export Modal -->
    <ExportAsCsv ref="csvDialog" :containerSelectList="containerSelectList"/>
    <ExportAsJson ref="jsonDialog" :containerSelectList="containerSelectList" />

  </v-app>
</template>

<script>

import { mapGetters } from "vuex";

import TabLoader from "../components/tab-loader.vue";
import ContainerDrawer from "../components/drawer/container-drawer.vue";
import ContainerLogs from "../components/display/container-logs.vue";
import InfiniteLoader from "../components/infinite-loader.vue";
import ContainerStatsDisplay from "../components/display/container-stats-display.vue";

// Modal import
import ExportAsCsv from "../components/modal/export-as-csv.vue";
import ExportAsJson from "../components/modal/export-as-json.vue";

export default {
  name: "IndexPage",

  components: {
    ContainerDrawer,
    ContainerLogs,
    InfiniteLoader,
    ContainerStatsDisplay,
    TabLoader,
    ExportAsCsv,
    ExportAsJson,
  },

  async created() {
    await this.getContainerList();
  },

  data() {
    return {
      containerList: [],
      containerSelectList: [],
      containerListLoading: false,
      title: "Walvis",
      clipped: false,
    };
  },

  computed: {
    ...mapGetters({
      containerListResponse: "getContainerListResponse",
      mode: "getMode",
      loading: "getStreamLoading",
      firstLoaded: "getFirstLoaded",
      logSseClient: "getSseClientObject",
      statsSseClient: "getSseStatsClientObject",
    }),
  },

  methods: {
    async getContainerList() {
      try {
        this.containerListLoading = true;
        await this.$store.dispatch("getContainerListAction");
        this.containerList = this.containerListResponse;
        this.containerListLoading = false;
      } catch (ex) {
        this.containerListLoading = false;
        console.log(ex.message);
      }
    },

    async refreshAllData() {
      try {
        // disconnect sse clients.
        await this.logSseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }

      try {
        await this.statsSseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }

      await this.$store.dispatch("refreshAllData");
      await this.getContainerList();
    },

    async openExportJsonModal() {
      if (!this.$refs.jsonDialog.dialog) {
        await this.$store.dispatch("getContainerListAction");
        this.containerSelectList = this.containerListResponse;
      }
      this.$refs.jsonDialog.dialog = !this.$refs.jsonDialog.dialog;
    },

    async openExportCsvModal() {
      if (!this.$refs.csvDialog.dialog) {
        await this.$store.dispatch("getContainerListAction");
        this.containerSelectList = this.containerListResponse;
      }
      this.$refs.csvDialog.dialog = !this.$refs.csvDialog.dialog;
    },
  },
};
</script>
