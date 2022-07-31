<template>
  <div>
    <v-row justify="center" align="center" class="mt-2">
      <v-col cols="12" sm="8" md="8">
        <v-card elevation="6" class="mt-2">
          <v-card-title class="headline text-uppercase">
            Settings
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-switch
                  @change="handleLogMode()"
                  v-model="logMode"
                  :label="`Stream Logs?`"
                ></v-switch>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-switch
                  v-model="showTimeStamp"
                  :label="`Show timestamps`"
                ></v-switch>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-switch
                  @change="handleStoppedContainer()"
                  v-model="showStoppedContainer"
                  :label="`Show stopped containers`"
                ></v-switch>
              </v-list-item>
              <v-list-item>
                <v-switch
                  @change="handleDarkMode()"
                  v-model="darkMode"
                  :label="`Dark Mode`"
                ></v-switch>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getContainerList", "running");
  },

  data() {
    return {
      logMode: localStorage.getItem("LOG_MODE") === "STREAM",
      showTimeStamp: localStorage.getItem("TIME_STAMP") === "SHOW",
      showStoppedContainer:
        localStorage.getItem("SHOW_DISABLED_CONTAINER") === "YES",
      darkMode: localStorage.getItem("DARK_MODE") === "YES",
    };
  },

  methods: {
    handleLogMode() {
      if (this.logMode) {
        localStorage.setItem("LOG_MODE", "STREAM");
      } else {
        localStorage.setItem("LOG_MODE", "STATIC");
      }
    },

    async handleStoppedContainer() {
      if (this.showStoppedContainer) {
        localStorage.setItem("SHOW_DISABLED_CONTAINER", "YES");
      } else {
        localStorage.setItem("SHOW_DISABLED_CONTAINER", "NO")
      }
      await localStorage.getItem("SHOW_DISABLED_CONTAINER") === 'NO' 
      ? this.$store.dispatch("getContainerList", "running")
      : this.$store.dispatch("getContainerList", "all");
    },

    handleDarkMode() {
      if (this.darkMode) {
        localStorage.setItem("DARK_MODE", "YES");
      } else {
        localStorage.setItem("DARK_MODE", "NO");
      }
    }
  },
};
</script>
