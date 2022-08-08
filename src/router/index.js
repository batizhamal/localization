import Vue from "vue";
import VueRouter from "vue-router";
import Localize from "../views/Localize";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "",
      component: {
        render: (c) => c("router-view"),
      },
      children: [
        {
          path: "/",
          name: "localize",
          component: Localize,
        },
      ],
    },
  ],
});
