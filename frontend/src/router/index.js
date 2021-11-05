import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import signup from "../views/signup.vue";
import login from "../views/login.vue";
import profil from "../views/profil.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/profil",
    name: "profil",
    component: profil,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
