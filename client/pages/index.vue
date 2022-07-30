<template>
  <div>
    <Info />
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8">
        <v-card elevation="6">
          <v-card-title class="headline text-uppercase">
            Containers
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-card>
              <v-tabs
                v-model="tab"
                grow
              >
                <v-tab
                  v-for="item in items"
                  :key="item"
                  @click="handleClickCurrentTab(item)"
                >
                  {{ item }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                  <v-card flat height="500px" :class="scrollbarTheme">
                    <v-card-text class="text-center" v-if="loadingContainers">
                      <Loader />
                    </v-card-text>
                    <v-card-text
                      class="text-center mt-5"
                      v-if="!loadingContainers && filteredList && filteredList.length === 0"
                    >
                      <p class="text-h6">No containers found</p>
                    </v-card-text>
                    <v-card-text v-else>
                      <v-list>
                        <v-list-item
                          v-for="(container, i) in filteredList"
                          :key="i"
                          :to="`/logs/${container.id}`"
                          router
                          exact
                        >
                          <v-icon>mdi-database</v-icon>
                          <v-list-item-title v-text="container.image" />
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
              <v-divider></v-divider>
              <v-card-actions>
                <v-text-field
                  v-model="searchContainer"
                  placeholder="Search container name"
                ></v-text-field>
              </v-card-actions>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Loader from '../components/Loader.vue';
import Info from "../components/Info.vue";

export default {
  name: "IndexPage",
  components: {
    Info,
    Loader,
  },

  methods: {
    handleClickCurrentTab(item) {
      if (item === "All") {
        this.containers = this.containerAll;
      } else if (item === "Running") {
        this.containers = this.containerRunning;
      }
    },
  },

  async created() {
    this.loadingContainers = true;
    await Promise.all([
      this.$store.dispatch("getContainerList", "all"),
      this.$store.dispatch("getContainerList", "running"),
      this.$store.dispatch("getInfo"),
    ]);
    this.containers = this.containerAll;
    this.loadingContainers = false;
  },

  data() {
    return {
      loadingContainers: false,
      tab: null,
      items: ["All", "Running"],
      searchContainer: "",
      containers: [],
    };
  },

  computed: {
    filteredList() {

      if (!this.searchContainer) {
        return this.containers.slice(0, 10);
      }

      return this.containers.filter((container) => {
        return container.image
          .toLowerCase()
          .includes(this.searchContainer.toLowerCase());
      }).slice(0, 10);
    },

    scrollbarTheme() {
      return "overflow-y-auto light";
    },
    ...mapGetters({
      containerAll: "getContainer",
      containerRunning: "getContainerRunning",
    }),
  },
};
</script>

<style scoped>
.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}
</style>
