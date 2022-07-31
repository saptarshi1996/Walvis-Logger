<template>
  <!-- <v-container> -->
  <v-row class="ml-1 mt-2 mr-1" justify="center" align="center">
    <v-col lg="2" sm="4" cols="2">
      <v-card elevation="5" class="text-center">
        <v-card-text v-if="info.container">
          <p class="text-h5 text--primary">{{ info.container }}</p>
          <p class="text--primary text-uppercase">CONTAINERS</p>
        </v-card-text>
        <v-card-text v-if="!info.container">
          <p class="text-h5 text--primary">0</p>
          <p class="text--primary text-uppercase">CONTAINERS</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="2" sm="4" cols="2">
      <v-card elevation="5" class="text-center">
        <v-card-text v-if="info.running">
          <p class="text-h5 text--primary">{{ info.running }}</p>
          <p class="text--primary text-uppercase">ACTIVE</p>
        </v-card-text>
        <v-card-text v-if="!info.running">
          <p class="text-h5 text--primary">0</p>
          <p class="text--primary text-uppercase">ACTIVE</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="2" sm="4" cols="2">
      <v-card elevation="5" class="text-center">
        <v-card-text v-if="info.stopped">
          <p class="text-h5 text--primary">{{ info.stopped }}</p>
          <p class="text--primary text-uppercase">STOPPED</p>
        </v-card-text>
        <v-card-text v-if="!info.stopped">
          <p class="text-h5 text--primary">0</p>
          <p class="text--primary text-uppercase">STOPPED</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="2" sm="4" ols="2">
      <v-card elevation="5" class="text-center">
        <v-card-text v-if="info.image">
          <p class="text-h5 text--primary">{{ info.image }}</p>
          <p class="text--primary text-uppercase">IMAGES</p>
        </v-card-text>
        <v-card-text v-if="!info.image">
          <p class="text-h5 text--primary">0</p>
          <p class="text--primary text-uppercase">IMAGES</p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="2" sm="4" cols="2">
      <v-card elevation="5" class="text-center">
        <v-card-text v-if="info.cpu">
          <p class="text-h5 text--primary">{{ info.cpu }}</p>
          <p class="text--primary text-uppercase">CPU</p>
        </v-card-text>
        <v-card-text v-if="!info.cpu">
          <Loader />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="2" sm="4" cols="2">
      <v-card elevation="5" class="text-center">
        <v-card-text v-if="info.memory">
          <p class="text-h5 text--primary">{{ info.memory }}</p>
          <p class="text--primary text-uppercase">RAM</p>
        </v-card-text>
        <v-card-text v-if="!info.memory">
          <Loader />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<script>
import Loader from "../components/Loader.vue";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      info: "getInfo",
    }),
  },

  components: {
    Loader,
  },
};
</script>
