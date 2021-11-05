<template>
  <router-view />
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
