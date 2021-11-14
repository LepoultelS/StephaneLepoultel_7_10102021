<template>
  <div class="login row justify-center items-center q-pb-xl q-pt-md">
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
      <div class="row">
        <q-card square class="login-form flat">
          <q-card-section>
            <q-form class="q-px-md" id="signForm"
              ><q-input
                :rules="[(val) => !!val || 'Field is required']"
                dense
                v-model="title"
                type="text"
                label="Titre du post"
                class="q-py-sm"
              >
                <template v-slot:prepend>
                  <q-icon name="title" />
                </template>
              </q-input>
              <q-input
                :rules="[(val) => !!val || 'Field is required']"
                dense
                v-model="postText"
                type="textarea"
                autogrow
                maxlength="340"
                bottom-slots
                counter
                label="Quoi de neuf ?"
              >
                <template v-slot:prepend>
                  <q-icon name="message" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-select
              :rules="[(val) => !!val || 'Field is required']"
              dense
              outlined
              class="q-px-xl"
              v-model="tag"
              :options="tagList"
              label="Catégorie"
            />
          </q-card-section>
          <q-banner
            v-if="postErr"
            inline-actions
            class="q-ma-lg text-white bg-negative"
          >
            Impossible de publier le post, veuillez réessayer !
            <template v-slot:action>
              <q-btn flat color="white" @click="postErr = false">
                <q-icon name="close" />
              </q-btn>
            </template>
          </q-banner>
          <q-card-actions class="q-pb-lg q-px-xl">
            <q-btn
              dense
              unelevated
              @click="post()"
              size="lg"
              color="secondary"
              class="full-width text-white"
              label="Poster"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: "addPost",

  data: () => ({
    title: "",
    postText: "",
    tag: "",
    tagList: ["travail", "musique", "film", "sortie", "sport", "jeux"],
    postErr: false,
  }),

  props: {
    user: [],
  },

  methods: {
    post() {
      if ((this.title, this.postText, this.tag)) {
        const token = JSON.parse(localStorage.groupomaniaUser).token;
        axios({
          method: "post",
          url: "http://localhost:3000/posts",
          headers: { Authorization: `Bearer ${token}` },
          data: {
            userId: this.user.id,
            title: this.title,
            description: this.postText,
            tag: this.tag,
          },
        })
          .then(() => {
            router.go();
          })
          .catch((erreur) => {
            this.postErr = true;
            console.log(erreur);
          });
      } else {
        this.postErr = true;
      }
    },
  },
};
</script>
