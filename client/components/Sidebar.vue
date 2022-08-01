<template>
  <div>
    <div v-if="$mq === 'lg'">
      <Web />
    </div>
    <div v-else>
      <Mobile :drawer="drawer" />
    </div>
  </div>
</template>

<script>
import Web from "../components/responsive/sidebar/Web.vue";
import Mobile from "../components/responsive/sidebar/Mobile.vue";

export default {
  components: {
    Web,
    Mobile,
  },

  props: ['drawer'],

};
</script>
