<template>
  <v-app dark>
  	<v-main>
  		<Nuxt />
  	</v-main>
  </v-app>
</template>

<script>
export default {
	middleware: 'unauth',

  mounted() {
    this.$vuetify.theme.dark = localStorage.getItem("DARK_MODE") === "YES";
  },
}
</script>
