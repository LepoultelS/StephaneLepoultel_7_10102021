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
    // get component() {
    //   if (localStorage.groupomaniaUser == undefined) {
    //     return login;
    //   }
    //   return home;
    // },
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
    // get component() {
    //   if (localStorage.groupomaniaUser == undefined) {
    //     return signup;
    //   }
    //   return home;
    // },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    // get component() {
    //   if (localStorage.groupomaniaUser == undefined) {
    //     return login;
    //   }
    //   return home;
    // },
  },
  {
    path: "/profil",
    name: "profil",
    component: profil,
    //   get component() {
    //     if (localStorage.groupomaniaUser == undefined) {
    //       return login;
    //     }
    //     return profil;
    //   },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
