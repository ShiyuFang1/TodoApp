<template>
  <v-carousel v-model="model">
    <v-carousel-item>
      <v-row class="fill-height" align="center" justify="center">
        <div class="text-h2">year: {{ info.year }}</div>
      </v-row>
    </v-carousel-item>
    <v-carousel-item>
      <v-row class="fill-height" align="center" justify="center">
        <div class="text-h2">month: {{ info.month }}</div>
      </v-row>
    </v-carousel-item>
    <v-carousel-item>
      <v-row class="fill-height" align="center" justify="center">
        <div class="text-h2">day: {{ info.day }}</div>
      </v-row>
    </v-carousel-item>
    <v-carousel-item>
      <v-row class="fill-height" align="center" justify="center">
        <div class="text-h2">num: {{ info.num }}</div>
      </v-row>
    </v-carousel-item>
    <v-carousel-item>
      <v-row class="fill-height" align="center" justify="center">
        <div class="text-h2">title: {{ info.safe_title }}</div>
      </v-row>
    </v-carousel-item>
    <v-carousel-item>
      <v-row class="fill-height" align="center" justify="center">
        <div class="text-h2">title: {{ info.img }}</div>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    model: 0,
    info: {},
  }),
  // Cross-OriginResourceSharing
  mounted() {
    axios
      .get("/api/info.0.json")
      .then((response) => (this.info = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

