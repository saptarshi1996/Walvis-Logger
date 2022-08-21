<template>
  <v-app dark>
  	<v-main>
  		<Nuxt />
  	</v-main>
  </v-app>
</template>

<script>
export default {
	middleware: 'userauth',
}
</script>
