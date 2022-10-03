<template>
  <div id="app">
    <v-app id="inspire">
      <v-snackbar v-model="snackbar" :timeout="4000" top color="error">
        <span>{{ snackbarText }}</span>
        <v-btn text color="white" @click="snackbar = false">Close</v-btn>
      </v-snackbar>

      <v-main>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-10">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Welcome</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="signin()" id="login-form">
                    <v-text-field
                      prepend-icon="person"
                      name="name"
                      v-model="name"
                      label="Name"
                      type="text"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    type="submit"
                    form="login-form"
                    :loading="loading"
                    >Sign in
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import "firebase/auth";

export default {
  data() {
    return {
      name: "",
      loading: false,
      login: false,
      nameRules: [
        (v) => {
          return v.length >= 2 || "Too short";
        },
      ],
      snackbar: false,
      snackbarText: "",
    };
  },

  methods: {
    sub() {
      if (!this.account) {
        return false;
      }
      if (!this.account) {
        return false;
      }
    },
    signin() {
      this.loading = true;
      localStorage.setItem("userName", JSON.stringify(this.name));
      this.loading = false;
      this.$router.replace("/dashboard");
    },
  },
};
</script>


<style>
@media only screen and (max-width: 768px) {
  .v-content {
    margin: 0;
  }
}
</style>
