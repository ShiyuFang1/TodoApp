<template>
  <nav>
    <v-snackbar v-model="snackbar" timeout="4000" top color="success">
      <span> Awesome! You added a new project. </span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <!-- Top Navigator -->
    <v-app-bar text app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text color="grey" @click="SignOut">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Side Navigator -->
    <v-navigation-drawer app v-model="drawer" class="secondary">
      <v-layout column align-center>
        <v-flex class="mt-5 mb-5"><Popup @click="projectAdded()" /></v-flex>
      </v-layout>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup.vue";
import { EventBus } from "@/event-bus.js";

export default {
  components: { Popup },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "book", text: "Album", route: "/album" },
      ],
      snackbar: false,
    };
  },
  methods: {
    SignOut() {
      this.$router.replace("/");
    },
    projectAdded() {},
  },
  mounted() {
    EventBus.$on("project-added", () => {
      this.snackbar = true;
    });
  },
};
</script>

<style>
</style>