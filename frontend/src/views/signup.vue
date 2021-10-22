<template>
  <div class="login row justify-center items-center q-py-lg">
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
            <q-form class="q-px-md">
              <q-input clearable type="text" label="Nom" class="q-py-sm">
                <template v-slot:prepend>
                  <q-icon name="face" />
                </template>
              </q-input>
              <q-input clearable type="text" label="Prénom" class="q-py-sm">
                <template v-slot:prepend>
                  <q-icon name="face" />
                </template>
              </q-input>
              <q-input
                clearable
                type="email"
                label="Adresse mail"
                class="q-py-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                clearable
                type="password"
                label="Mot de passe"
                class="q-py-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                clearable
                type="password"
                label="Confirmation mot de passe"
                class="q-py-sm"
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
</template>
