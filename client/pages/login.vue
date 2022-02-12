<template>
  <v-main>
    <v-row class="justify-center" style="margin-top: 5%">
      <v-col md="12" lg="5" sm="12">
        <v-card class="mx-auto px-3 py-5" max-width="500">
          <v-card-title>LOGIN</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <form>
              <v-text-field
                v-model="loginModel.username"
                label="Username"
                required
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="loginModel.password"
                label="Password"
                required
                type="password"
              ></v-text-field>

              <v-btn
                @click.prevent="loginUser"
                color="primary"
                block
                class="my-2"
              >
                SIGN IN
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  layout: "unauth",
  data() {
    return {
      loginModel: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async loginUser() {
      this.$loading.show("loading...");
      try {
        await this.$auth.loginWith("local", { data: this.loginModel });
        this.$loading.hide("loading...");
      } catch (ex) {
        this.$loading.hide("loading...");
        if (ex.response) {
          this.$alert({
            htmlSupport: true,
            content: `<div>${ex.response.data.msg}</div>`,
            title: `<div>Message</div>`,
            btn: {
              text: "Ok",
            },
          });
        } else {
          this.$alert.message({
            htmlSupport: true,
            content: `<div>${ex.message}</div>`,
            title: `<div>Message</div>`,
            btn: {
              text: "Ok",
            },
          });
        }
      }
    },
  },
};
</script>
