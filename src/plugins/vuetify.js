import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#f83e70",
        success: "#3cd1c2",
        warning: "#ffaa2c",
      },
    },
  },
});

export default new Vuetify({
  theme: { light: true },
});
