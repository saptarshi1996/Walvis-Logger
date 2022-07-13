<template>
  <v-row>
    <v-col cols="12" class="p-4">
      <v-container>
        <h2>About</h2>
        <v-divider></v-divider>
        <p class="text-justify mt-5">
          Walvis is a realtime logger to display container logs.
        </p>
      </v-container>
      <v-form class="p-4">
        <v-container>
          <h2>Settings</h2>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <v-switch
                v-model="showTimeStamp"
                :label="`Show timestamps`"
              ></v-switch>
              <v-switch
                v-model="showDisabledContainer"
                :label="`Show disabled containers`"
              ></v-switch>
              <v-switch v-model="streamLogs" :label="`Stream Logs`"></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {
      showTimeStamp: localStorage.getItem("showTimeStamp"),
      showDisabledContainer: localStorage.getItem("showDisabledContainer"),
      streamLogs: localStorage.getItem("streamLogs"),
    };
  },

  watch: {
    showTimeStamp(value) {
      localStorage.setItem("showTimeStamp", value);
    },

    showDisabledContainer(value) {
      localStorage.setItem("showDisabledContainer", value);
    },

    streamLogs(value) {
      localStorage.setItem("streamLogs", value);
    },
  },
};
</script>
