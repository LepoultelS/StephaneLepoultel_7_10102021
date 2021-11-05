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
    meta: { title: 'Accueil  |  Groupomania Social' }
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
    meta: { title: 'Inscritpion  |  Groupomania Social' }
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { title: 'Connexion  |  Groupomania Social' }
  },
  {
    path: "/profil",
    name: "profil",
    component: profil,
    meta: { title: 'Profil  |  Groupomania Social' }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const DEFAULT_TITLE = "Groupomania Social";
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
