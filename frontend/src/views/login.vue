<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/">
            <img
              class="logo q-pt-sm"
              src="../assets/Groupomania_Logos/icon-left-font-monochrome-white.svg"
            />
          </router-link>
        </q-toolbar-title>
        <router-link to="/login" style="text-decoration: none;">
          <q-btn class="text-primary col-xl bg-white" v-if="isConnect">
            Déconnexion
          </q-btn>
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="login row justify-center items-center q-py-xl">
        <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
          <div class="row">
            <q-card square class="login-form shadow-20">
              <q-card-section class="bg-primary">
                <h4 class="text-h5 text-white q-my-md">Connexion</h4>
                <div
                  class="absolute-bottom-right q-pr-md"
                  style="transform: translateY(25%);"
                >
                  <router-link to="/signup" style="text-decoration: none;">
                    <q-btn fab icon="add" color="secondary">
                      <q-tooltip
                        class="text-body2"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                        >Inscription</q-tooltip
                      >
                    </q-btn>
                  </router-link>
                </div>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input
                    :rules="[(val) => !!val || 'Field is required']"
                    type="email"
                    label="Adresse mail"
                    v-model="email"
                    @keydown.enter="login()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    :rules="[(val) => !!val || 'Field is required']"
                    type="password"
                    label="Mot de passe"
                    v-model="password"
                    @keydown.enter="login()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
                <q-banner
                  v-if="authErr"
                  inline-actions
                  class="text-white bg-negative"
                >
                  Adresse mail ou mot de passe incorrect, veuillez réessayer !
                  <template v-slot:action>
                    <q-btn flat color="white" @click="authErr = false">
                      <q-icon name="close" />
                    </q-btn>
                  </template>
                </q-banner>
              </q-card-section>
              <q-card-section>
                <div class="text-center q-pa-md q-gutter-md">
                  <q-btn round color="indigo-7">
                    <q-icon name="fab fa-facebook-f" size="1.2rem" />
                  </q-btn>
                  <q-btn round color="red-8">
                    <q-icon name="fab fa-google-plus-g" size="1.2rem" />
                  </q-btn>
                  <q-btn round color="light-blue-5">
                    <q-icon name="fab fa-twitter" size="1.2rem" />
                  </q-btn>
                </div>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  class="full-width text-white"
                  label="Se connecter"
                  @click="login()"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">
                  Mot de passe
                  <a
                    href="#"
                    class="text-primary col-xl"
                    style="text-decoration: none;"
                    >oublié</a
                  >
                  ?
                </p>
                <p class="text-grey-6">
                  Pas encore inscrit ?
                  <router-link
                    to="/signup"
                    class="text-primary col-xl"
                    style="text-decoration: none;"
                  >
                    S'inscrire
                  </router-link>
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  data: () => ({
    email: "",
    password: "",
    isConnect: false,
    authErr: false,
  }),

  created() {
    if (localStorage.groupomaniaUser) {
      router.push({ path: "/" });
    }
  },

  updated() {
    this.connectedUser();
  },

  methods: {
    // Vérification de la présence d'un token
    connectedUser() {
      if (localStorage.groupomaniaUser == null) {
        this.isConnect = false;
        console.log("Utilisateur non connecté !");
      } else {
        this.isConnect = true;
        console.log("Utilisateur connecté !");
      }
    },
    disconnect() {
      localStorage.clear();
      console.log("Utilisateur déconnecté !");
    },
    login() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          console.log("connecté");
          const groupomaniaUser = {
            token: response.data.token,
          };
          localStorage.setItem(
            "groupomaniaUser",
            JSON.stringify(groupomaniaUser)
          );
          router.push({ path: "/" });
        })
        .catch((erreur) => {
          this.authErr = true;
          console.log(erreur, "Problème de connexion");
        });
    },
  },
};
</script>
