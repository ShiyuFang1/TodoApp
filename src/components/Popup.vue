<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="success" v-on="on"> Add new project</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h2>Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            :rules="inputRules"
            label="Title"
            v-model="title"
            prepend-icon="folder"
          ></v-text-field>
          <v-text-field
            :rules="inputRules"
            label="Name"
            v-model="name"
            prepend-icon="user"
          ></v-text-field>
          <v-textarea
            :rules="inputRules"
            label="Information"
            v-model="content"
            prepend-icon="edit"
          ></v-textarea>

          <v-menu>
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formattedDate"
                v-on="on"
                label="Due date"
                prepend-icon="date_range"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>

          <v-btn
            text
            class="success mx-0 mt-0"
            @click="submit"
            :loading="loading"
            >Add project
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";

import { parseISO } from "date-fns/esm/fp";
import { EventBus } from "@/event-bus.js";
export default {
  data() {
    return {
      title: "",
      name: "",
      content: "",
      due: null,
      inputRules: [(v) => v.length >= 3 || "Minimum length is 3 characters"],
      loading: false,
      dialog: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          title: this.title,
          name: this.name,
          content: this.content,
          due: format(parseISO(this.due), "yyyy-MM-dd"),
          status: "ongoing",
        };
        localStorage.setItem("projects", JSON.stringify(project));
        console.log(JSON.parse(localStorage.getItem("projects")));
        this.loading = false;
        this.dialog = false;
        this.formReset();

        EventBus.$emit("project-added");
      }
    },
    formReset() {
      this.title = "";
      this.name = "";
      this.content = "";
      this.due = null;
    },
  },
  computed: {
    formattedDate() {
      return this.due ? format(parseISO(this.due), "yyyy-MM-dd") : "";
    },
  },
  mounted() {
    EventBus.$on("dialog", (value) => {
      this.dialog = value;
    });
  },
};
</script>

<style>
</style>