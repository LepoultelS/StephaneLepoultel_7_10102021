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
                <h4 class="text-h5 text-white q-my-md">Inscription</h4>
                <div
                  class="absolute-bottom-right q-pr-md"
                  style="transform: translateY(25%);"
                >
                  <router-link to="/login" style="text-decoration: none;">
                    <q-btn fab icon="close" color="secondary">
                      <q-tooltip
                        class="text-body2"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                        >Annuler l'inscription</q-tooltip
                      >
                    </q-btn>
                  </router-link>
                </div>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-md" id="signForm">
                  <q-input
                    :rules="[(val) => !!val || 'Field is required']"
                    v-model="firstname"
                    type="text"
                    label="Prénom"
                    class="q-py-sm"
                    @keydown.enter="signup()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="face" />
                    </template>
                  </q-input>
                  <q-input
                    :rules="[(val) => !!val || 'Field is required']"
                    v-model="name"
                    type="text"
                    label="Nom"
                    class="q-py-sm"
                    @keydown.enter="signup()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="face" />
                    </template>
                  </q-input>
                  <q-input
                    :rules="[(val) => !!val || 'Field is required']"
                    v-model="email"
                    type="email"
                    label="Adresse mail"
                    class="q-py-sm"
                    @keydown.enter="signup()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    :rules="[(val) => !!val || 'Field is required']"
                    v-model="password"
                    type="password"
                    label="Mot de passe"
                    class="q-py-sm"
                    hint="Au moins 6 caractères, 1 Majuscule et 1 minuscule"
                    @keydown.enter="signup()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-pa-lg">
                <q-btn
                  unelevated
                  @click="signup()"
                  size="lg"
                  color="secondary"
                  class="full-width text-white"
                  label="S'inscrire"
                />
              </q-card-actions>
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
    name: "",
    firstname: "",
    email: "",
    password: "",
    isConnect: false,
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
    signup() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/signup",
        data: {
          name: this.name,
          firstname: this.firstname,
          email: this.email,
          password: this.password,
        },
      })
        .then(function() {
          router.push({ path: "/login" });
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
    },
  },
};
</script>
