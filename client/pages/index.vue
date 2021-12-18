<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <ContainerList :containerList="containerList" />
    </v-col>
    <v-col cols="8" sm="8" md="6">
      <v-card></v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

import ContainerList from "../components/container-list.vue";

export default {
  name: "IndexPage",

  components: {
    ContainerList,
  },

  async created() {
    await this.getContainerList();
  },

  data() {
    return {
      containerList: [],
    };
  },

  computed: {
    ...mapGetters({
      containerListResponse: "getContainerListResponse",
    }),
  },

  methods: {
    async getContainerList() {
      try {
        await this.$store.dispatch("getContainerListAction");
        this.containerList = this.containerListResponse;
        console.log(this.containerList);
      } catch (ex) {
        console.log(ex.message);
      }
    },
  },
};
</script>
