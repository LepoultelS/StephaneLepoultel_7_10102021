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
         <router-link to="/login" style="text-decoration: none;" v-if="isConnect">
          <q-btn class="text-primary col-xl bg-white" @click="disconnect()">
            Déconnexion
          </q-btn>
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <h1 v-if="isConnect" class="text-center">Connecté</h1>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "home",

  components: {
  },

  data() {
    return {
      isConnect: false,
    };
  },

  created() {
    this.connectedUser();
  },

  methods: {
    // Vérification de la présence d'un token
    connectedUser() {
      if (localStorage.groupomaniaUser == undefined) {
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
  },
};
</script>
