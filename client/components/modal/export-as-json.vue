<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> Export as JSON </v-card-title>
        <v-card-text>
          <v-select
            :disabled="loadingJsonModal"
            v-model="exportAsJsonForm.selectedContainer"
            item-text="name"
            item-value="id"
            :items="containerSelectList"
            label="Select Container"
          ></v-select>
          <v-text-field
            name="fileName"
            label="File Name"
            v-model="exportAsJsonForm.fileName"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click.prevent="downloadLogsAsJSON"
            :disabled="loadingJsonModal"
            >Download</v-btn
          >
          <v-btn
            color="primary"
            text
            @click.prevent="dialog = false"
            :disabled="loadingJsonModal"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      exportAsJsonForm: {
        selectedContainer: null,
        fileName: "",
      },
      dialog: false,
      sinceMenu: false,
      untilMenu: false,
      loadingJsonModal: false,
    };
  },

  props: ["containerSelectList"],

  methods: {
    async downloadLogsAsJSON() {
      try {
        this.loadingJsonModal = true;

        if (
          this.exportAsJsonForm &&
          this.exportAsJsonForm.selectedContainer &&
          this.exportAsJsonForm.fileName
        ) {

            const id = this.exportAsJsonForm.selectedContainer;
            const fileName = this.exportAsJsonForm.fileName;
            const dataType = "json";

            // open this tag in a new window to download the file
            const baseUrl = process.env.SERVER_BASE_URL;
            window.open(`${baseUrl}/logger-server/download-logs/${id}?log_format=${dataType}&file_name=${fileName}`);
        }

        this.loadingJsonModal = false;
      } catch (ex) {
        console.log(ex.message);
        this.loadingJsonModal = false;
      }
    },

    clearForm() {
      this.exportAsJsonForm = {
        selectedContainer: null,
        fileName: "",
      };
    },
  },

  watch: {
    dialog(value) {
      if (!value) {
        this.clearForm();
      }
    },
  },
};
</script>
