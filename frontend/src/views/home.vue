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

    <q-page-container>
      <div class="row">
        <q-input
          v-model="searchName"
          label="Recherche par Nom d'auteur"
          class="q-px-md col-12 col-sm-6"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          v-model="searchTag"
          label="Recherche par tag"
          class="q-px-md col-12 col-sm-6"
          hint="travail, musique, film, sortie, sport, jeux"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="text-center">
        <router-link
          to="/profil"
          style="text-decoration: none;"
          v-if="!searchTag && !searchName"
          class="text-primary text-center q-px-lg"
        >
          <q-btn class="text-primary col-xl bg-white q-mt-lg">
            Vers le profil de {{ user.firstname }} {{ user.name }}
          </q-btn>
        </router-link>
      </div>
      <addPost v-if="!searchTag && !searchName" :user="user" />
      <div v-for="post in posts" v-bind:key="post.id">
        <post
          v-if="
            post.postTag.includes(searchTag) &&
              post.postCreateByUserName.includes(searchName)
          "
          :post="post"
          :user="user"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import addPost from "../components/addPost.vue";
import post from "../components/post.vue";
import axios from "axios";
import jwt from "jsonwebtoken";
import router from "../router/index";

export default {
  name: "home",

  components: { addPost, post },

  data() {
    return {
      isConnect: false,
      user: [],
      posts: [],
      searchTag: "",
      searchName: "",
    };
  },

  created() {
    this.connectedUser();
    if (localStorage.groupomaniaUser == null) {
      router.push({ path: "/login" });
    }
  },

  mounted() {
    if (this.isConnect === true) {
      // Récupération du token dans le localstorage
      const token = JSON.parse(localStorage.groupomaniaUser).token;
      let decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_KEY);
      this.sessionUserId = decodedToken.userId;
      this.sessionUserAcces = decodedToken.admin;
      this.getUser();
      this.getPosts();
    }
  },

  methods: {
    // Vérification de la présence d'un token
    connectedUser() {
      // exemple de ternaire
      this.isConnect = localStorage.groupomaniaUser == null ? false : true;

      // a la place de :

      // if (localStorage.groupomaniaUser == null) {
      //   this.isConnect = false;
      // } else {
      //   this.isConnect = true;
      // }
    },
    disconnect() {
      localStorage.removeItem("groupomaniaUser");
      router.push({ path: "/login" });
      console.log("Utilisateur déconnecté !");
    },
    getUser() {
      const userId = this.sessionUserId;
      const token = JSON.parse(localStorage.groupomaniaUser).token;

      axios({
        method: "get",
        url: `http://localhost:3000/users/${userId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.user = response.data;
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
    getPosts() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;

      axios({
        method: "get",
        url: `http://localhost:3000/posts`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.posts = response.data;
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
  },
};
</script>
