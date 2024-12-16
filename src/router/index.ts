import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import MainPage from "../views/MainPage.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/",
    name: "mainPage",
    component: MainPage,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tmp/AboutView.vue"),
  },
  {
    path: "/pacman",
    name: "pacman",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tmp/Pacman.vue"),
  },
  {
    path: "/anyThingPage",
    name: "anyThingPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tmp/AnyThingPage.vue"),
  },
  {
    path: "/spade",
    name: "spade",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tmp/Spade.vue"),
  },
  {
    path: "/clone",
    name: "clone",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tmp/cloneCode.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
