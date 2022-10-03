import Vue from "vue";
import Router from "vue-router";
import dashboard from "../views/dashboard.vue";
import album from "../views/album.vue";
import login from "../views/login";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboard,
    },
    {
      path: "/album",
      name: "album",
      component: album,
    },
  ],
});
