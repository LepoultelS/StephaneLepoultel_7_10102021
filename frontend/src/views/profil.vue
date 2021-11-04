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
      <div>
        <p class="text-center text-primary text-h4 q-pt-lg">
          {{ user.firstname }} {{ user.name }}
        </p>
      </div>
      <div class="row text-center q-py-xl">
        <div v-if="numPosts <= 1" class="col">
          {{ numPosts }}<br />post publié
        </div>
        <div v-else class="col">{{ numPosts }}<br />posts publiés</div>
        <q-separator vertical color="primary" />
        <div v-if="numCom <= 1" class="col">
          {{ numCom }}<br />commentaire envoyé
        </div>
        <div v-else class="col">{{ numCom }}<br />commentaires envoyés</div>
      </div>
      <addPost :user="user" />
      <div v-for="post in posts" v-bind:key="post.id">
        <post :post="post" :user="user" />
      </div>
      <div class="text-center">
        <q-btn class="text-white col-xl bg-negative q-my-lg" @click="deleteUser()">
          Supprimer le compte
        </q-btn>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import addPost from "../components/addPost.vue";
import post from "../components/post.vue";
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "home",

  components: { addPost, post },

  data() {
    return {
      isConnect: false,
      user: [],
      posts: [],
      userId: "",
      numPosts: 0,
      numCom: 0,
    };
  },

  created() {
    this.connectedUser();
    this.useId = this.user.id;
  },

  mounted() {
    if (this.isConnect === true) {
      // Récupération du token dans le localstorage
      const token = JSON.parse(localStorage.groupomaniaUser).token;
      let decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_KEY);
      this.sessionUserId = decodedToken.userId;
      this.sessionUserAcces = decodedToken.admin;
      this.getUser();
      this.getUserPosts();
      this.getUserComments();
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
      localStorage.removeItem("groupomaniaUser");
      location.href = "/";
      location.reload();
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
    getUserPosts() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;
      const userId = this.sessionUserId;

      axios({
        method: "get",
        url: `http://localhost:3000/posts/${userId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.posts = response.data;
          this.numPosts = this.posts.length;
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
    getUserComments() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;

      axios({
        method: "get",
        url: `http://localhost:3000/comments/`,
        data: {
          id: this.user.id,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.comment = response.data;
          this.numCom = this.comment.length;
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
    deleteUser() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;
      const userId = this.user.id;

      axios({
        method: "delete",
        url: `http://localhost:3000/users/${userId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response);
          localStorage.removeItem("groupomaniaUser");
          this.$router.push('/');
          location.reload();
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
  },
};
</script>
