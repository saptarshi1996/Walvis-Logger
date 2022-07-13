<template>
  <v-row class="pl-2 pr-2 mt-2">
    <v-col lg="2" align="center" class="mt-2">
      <p class="text-h5 text--primary">63</p>
      <p class="text--primary">TOTAL</p>
    </v-col>
    <v-col lg="2" align="center" class="mt-2">
      <p class="text-h5 text--primary">2</p>
      <p class="text--primary">RUNNING</p>
    </v-col>
    <v-col lg="2" align="center" class="mt-2">
      <p class="text-h5 text--primary">61</p>
      <p class="text--primary">INACTIVE</p>
    </v-col>
    <v-col lg="2" align="center" class="mt-2">
      <p class="text-h5 text--primary">15%</p>
      <p class=" text--primary">MEMORY</p>
    </v-col>
     <v-col lg="2" align="center" class="mt-2">
      <p class="text-h5 text--primary">15%</p>
      <p class="text--primary">CPU</p>
    </v-col>
     <v-col lg="2" align="center" class="mt-2">
      <p class="text-h5 text--primary">15%</p>
      <p class="text--primary">CPU</p>
    </v-col>

    <v-col lg="12" style="margin-top: 5%;">
      <v-card class="mx-auto" max-width="600" outlined>
        <v-card-title>Containers</v-card-title>
        <v-divider></v-divider>
        <v-list-item class="pb-0 mb-0">
          <v-list-item-content>
            <v-text-field
              v-model="searchTerm"
              label="Search here"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list flat>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(container, i) in containerList" :key="i">
              <v-list-item-icon>
                <v-icon>mdi-database</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="container.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchTerm: "",
    };
  },

  created() {},

  computed: {
    ...mapGetters({
      containerList: "getContainerList",
    }),
  },
};
</script>
