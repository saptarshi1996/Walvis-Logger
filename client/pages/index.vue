<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <v-card class="mx-auto" max-width="300" tile>
        <v-list dense>
          <v-subheader>CONTAINERS</v-subheader>
          <v-list-item-group v-model="selectedItem" color="error">
            <v-list-item
              v-for="(item, i) in containerList"
              :key="i"
              @click.prevent="getLogs(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="8" sm="8" md="6">
      <v-card></v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import VueSSE from "vue-sse";

// using defaults
Vue.use(VueSSE);

export default {
  name: "IndexPage",

  data() {
    return {
      containerList: [],
      selectedItem: null,
      sseClient: null,
    };
  },

  async created() {
    await this.getContainerList();
  },

  methods: {
    async getContainerList() {
      try {
        const { data } = await this.$axios.get("/container_list");
        this.containerList = data.Response.data;
      } catch (ex) {
        console.log(ex.message);
      }
    },

    async getLogs(id) {
      this.sseClient = await this.$sse
        .create(`http://localhost:9999/stream/${id}`)
        .on("message", (msg) => console.info("Message:", msg))
        .on("error", (err) =>
          console.error("Failed to parse or lost connection:", err)
        )
        .connect()
        .catch((err) => console.error("Failed make initial connection:", err));
    },
  },

  watch: {
    selectedItem(value) {
      try {
        this.sseClient.disconnect();
      } catch (ex) {
        console.log(ex.message);
      }
    },
  },
};
</script>
