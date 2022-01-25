<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> Export as json </v-card-title>
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

          <v-menu
            :disabled="
              !exportAsJsonForm.selectedContainer && !exportAsJsonForm.fileName
            "
            ref="sinceMenu"
            v-model="sinceMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="exportAsJsonForm.since"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="exportAsJsonForm.since"
                label="From time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="sinceMenu"
              v-model="exportAsJsonForm.since"
              full-width
              format="24hr"
              @click:minute="$refs.sinceMenu.save(exportAsJsonForm.since)"
            ></v-time-picker>
          </v-menu>

          <v-menu
            :disabled="
              !exportAsJsonForm.selectedContainer && !exportAsJsonForm.fileName
            "
            ref="untilMenu"
            v-model="untilMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="exportAsJsonForm.until"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="exportAsJsonForm.until"
                label="Until time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="untilMenu"
              v-model="exportAsJsonForm.until"
              full-width
              format="24hr"
              @click:minute="$refs.untilMenu.save(exportAsJsonForm.until)"
            ></v-time-picker>
          </v-menu>
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
import dateHelper from "../../helpers/date-helper";

export default {
  data() {
    return {
      exportAsJsonForm: {
        selectedContainer: null,
        since: null,
        until: null,
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
          if (this.exportAsJsonForm.since && this.exportAsJsonForm.until) {
            const sinceTimeStamp = dateHelper.calculateDateTimeFromTime(
              this.exportAsJsonForm.since
            );
            const untilTimeStamp = dateHelper.calculateDateTimeFromTime(
              this.exportAsJsonForm.until
            );

            if (untilTimeStamp < sinceTimeStamp) {
              this.loadingJsonModal = false;
              return;
            }

            const id = this.exportAsJsonForm.selectedContainer;
            const since = sinceTimeStamp;
            const until = untilTimeStamp;
            const fileName = this.exportAsJsonForm.fileName;
            const dataType = "json";

            // open this tag in a new window to download the file
            const baseUrl = process.env.SERVER_BASE_URL;
            window.open(
              `${baseUrl}/logger-server/download-logs/${id}?log_format=${dataType}&since=${since}&until=${until}&file_name=${fileName}`
            );
          }
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
        since: null,
        until: null,
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
