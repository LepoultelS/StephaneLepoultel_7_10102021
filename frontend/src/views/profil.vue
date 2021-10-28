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
        <router-link
          to="/login"
          style="text-decoration: none;"
          v-if="isConnect"
        >
          <q-btn class="text-primary col-xl bg-white" @click="disconnect()">
            Déconnexion
          </q-btn>
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container v-if="isConnect">
      <h1 class="text-center text-primary">Profil de {{ user.firstname }}</h1>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";
// import {connectedClient} from "@/services/auth.js"

export default {
  name: "home",

  components: {},

  data() {
    return {
      isConnect: false,
      user: [],
    };
  },

  created() {
    this.connectedUser();
  },

  mounted() {
    if (this.isConnect === true) {
      const secretKey = process.env.JWT_KEY
      // Récupération du token dans le localstorage
      const token = JSON.parse(localStorage.groupomaniaUser).token;
              //                      //
              // TODO Gérer le secret //
              //                      //
      let decodedToken = jwt.verify(token, secretKey);
      this.sessionUserId = decodedToken.userId;
      this.sessionUserAcces = decodedToken.admin;
      this.getUser();
    }
  },

  methods: {
    // Vérification de la présence d'un token
    connectedUser() {
      if (localStorage.groupomaniaUser == undefined) {
        this.isConnect = false;
      } else {
        this.isConnect = true;
      }
    },
    disconnect() {
      localStorage.clear();
      console.log("Utilisateur déconnecté !");
    },
    getUser() {
      const userId = this.sessionUserId;
      const token = JSON.parse(localStorage.groupomaniaUser).token;

      axios({
        method: "get",
        url: `http://localhost:3000/users/${userId}`,
        headers: {Authorization: `Bearer ${token}`},
      })
        .then((response) => {
          this.user = response.data;
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
  },
};
</script>
