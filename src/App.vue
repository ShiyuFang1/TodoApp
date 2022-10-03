<template>
  <v-app class="grey lighten-4">
    <Navbar v-if="show"/>
    <v-main class="mx-4 mb-4"><router-view></router-view></v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    show () {
      return this.$route.path != '/'; 
    }
  }
};
</script>
