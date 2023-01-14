<template>
  <div>
    <v-row justify="center" align="center" class="mt-6">
      <v-col cols="6" lg="6" xs="12" sm="12" md="12">
        <v-card elevation="6">
          <v-card-title>Instances</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list v-if="instances.length > 0">
              <v-list-item v-for="(instance, i) in instances" :key="i">
                <v-row>
                  <v-col cols="8">
                    <!-- <v-icon>mdi-database</v-icon> -->
                    <v-list-item-title v-text="instance.name" />
                  </v-col>
                  <v-col cols="4">
                    <v-btn @click.prevent="connectInstance(instance)" small text
                      >Connect</v-btn
                    >
                    <v-btn @click.prevent="removeInstance(i)" small text
                      >Delete</v-btn
                    >
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
            <div class="text-center" v-else>
              No Instances found.
            </div>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text @click="addInstanceModal = !addInstanceModal">
              Add Instance
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="addInstanceModal" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span>Add Instance</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="createInstanceModel.name"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  v-model="createInstanceModel.environment"
                  :items="environments"
                  label="Environment"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click.prevent="createNewInstance">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: "instance",

  data() {
    return {
      instances: [],
      addInstanceModal: false,
      environments: ["LOCAL"],
      createInstanceModel: {
        name: "",
        environment: "",
      },
    };
  },

  created() {
    if ("instances" in localStorage) {
      this.getInstances();
    } else {
      localStorage.setItem("instances", JSON.stringify([]));
    }
  },

  methods: {
    getInstances() {
      const instances = localStorage.getItem("instances");
      const instanceList = JSON.parse(instances);
      this.instances = instanceList;
    },

    closeModal() {
      this.createInstanceModel = {
        name: "",
        environment: "",
      };
      this.addInstanceModal = false;
    },

    async createNewInstance() {
      if (this.instances.length >= 5) {
        console.log("Only 5");
        return;
      }

      const instancePayload = {
        name: this.createInstanceModel.name,
        environment: this.createInstanceModel.environment,
      };
      await this.$store.dispatch("setupConnect", {
        ...instancePayload.environment,
      });

      const instances = localStorage.getItem("instances");
      const instanceList = JSON.parse(instances);
      instanceList.push(instancePayload);
      localStorage.setItem("instances", JSON.stringify(instanceList));

      localStorage.setItem("instanceSet", "TRUE");

      this.addInstanceModal = false;
      this.getInstances();
    },

    async connectInstance(instancePayload) {
      await this.$store.dispatch("setupConnect", {
        ...instancePayload.environment,
      });

      this.$router.push("/");

      localStorage.setItem("instanceSet", "TRUE");
    },

    removeInstance(index) {
      this.instances.splice(index, 1);
      localStorage.setItem("instances", JSON.stringify(this.instances));
    }
  },
};
</script>
