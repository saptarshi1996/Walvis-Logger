<template>
  <div>
    <v-app-bar app clipped-left flat>
      <v-toolbar-title class="text-h5" @click.prevent="$router.push('/')">Walvis</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item style="cursor: pointer;" v-for="(item, i) of items" :key="i">
            <v-list-item-title @click.prevent="$router.push(item.router)">{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data () {
    return {
      items: [
        {
          name: 'Home',
          router: '/',
        },
        {
          name: 'Containers',
          router: '/container',
        },
        {
          name: 'Settings',
          router: '/settings',
        },
        {
          name: 'Logout',
          router: '/logout',
        }
      ]
    }
  }
};
</script>
