<template>
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
                <q-btn fab icon="add" color="secondary" @click="toto">
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
              <q-input clearable type="email" label="Adresse mail">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input clearable type="password" label="Mot de passe ">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
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
</template>

<script>
export default {
  name: "login",
};
</script>
