import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  }
});

export default router;
