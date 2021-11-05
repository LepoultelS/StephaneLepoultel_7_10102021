<template>
  <div class="login row justify-center items-center q-pb-xl q-pt-md">
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
      <div class="row">
        <q-card square class="login-form flat">
          <q-card-section>
            <q-form class="q-px-md" id="signForm"
              ><q-input
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
              dense
              outlined
              class="q-px-xl"
              v-model="tag"
              :options="tagList"
              label="Catégorie"
            />
          </q-card-section>
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
  }),

  props: {
    user: [],
  },

  methods: {
    post() {
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
        .then(function() {
          router.go();
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
    },
  },
};
</script>
