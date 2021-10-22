<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/">
            <img
              class="logo q-pt-sm"
              src="./assets/Groupomania_Logos/icon-left-font-monochrome-white.svg"
            />
          </router-link>
        </q-toolbar-title>
        <router-link
          to="/login"
          class="text-white col-xl"
          style="text-decoration: none;"
        >
          Déconnexion
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    
  </q-layout>
</template>

<script></script>

<style lang="scss">
@media (min-width: 599px) {
  .logo {
    width: 20%;
  }
  .login-form {
    width: 100%;
  }
}
@media (max-width: 600px) {
  .logo {
    width: 100%;
  }
  .login-form {
    width: 100%;
  }
}
</style>
