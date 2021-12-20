<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-container>
        <v-toolbar-title v-text="title" />
      </v-container>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      title: "Walvis",
    };
  },
};
</script>
