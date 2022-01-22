<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        v-if="$mq == 'sm'"
        @click.stop="$refs.drawer.drawer = !$refs.drawer.drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <ContainerList
      :containerList="containerList"
      :containerListLoading="containerListLoading"
      :drawer="drawer"
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
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import TabLoader from "../components/tab-loader.vue";
import ContainerList from "../components/container-list.vue";
import ContainerLogs from "../components/container-logs.vue";
import InfiniteLoader from "../components/infinite-loader.vue";
import ContainerStatsDisplay from "../components/container-stats-display.vue";
import Options from "../components/options.vue";

export default {
  name: "IndexPage",

  components: {
    ContainerList,
    ContainerLogs,
    InfiniteLoader,
    ContainerStatsDisplay,
    Options,
    TabLoader,
  },

  async created() {
    await this.getContainerList();
  },

  data() {
    return {
      containerList: [],
      containerListLoading: false,
      drawer: false,
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
  },
};
</script>
