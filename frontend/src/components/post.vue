<template>
  <div class="login row justify-center items-center q-py-md">
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
      <div class="row">
        <q-card square class="login-form flat">
          <q-card-section class="q-pt-xs">
            <div class="row">
              <div class="text-overline col">
                {{ post.postCreateByUserFirstname }}
                {{ post.postCreateByUserName }}
              </div>
              <div v-if="isMine">
                <q-icon
                  id="delete"
                  name="delete"
                  @click="deletePost(this.post.postId)"
                />
              </div>
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs q-mr-md">
              {{ post.postTitle }}
              <q-badge class="q-pa-sm" align="middle" :color="colorBadge">
                {{ post.postTag }}
              </q-badge>
            </div>
            <div class="text-body2">
              {{ post.postDescription }}
            </div>
          </q-card-section>

          <q-card-section class="row flex flex-center text-caption text-grey">
            <div class="col">
              {{ dateFormat(post.postCreationDate) }}
            </div>
            <div class="col-5"></div>
            <div>
              0 Commentaires
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import axios from "axios";

export default {
  name: "post",

  data: () => ({
    colorBadge: "",
    isMine: false,
  }),

  props: {
    post: [],
    user: [],
  },

  mounted() {
    this.colorBadge = this.post.postTag;
  },

  created() {
    this.checkIsMine();
    console.log(this.user);
  },

  methods: {
    checkIsMine() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;
      let decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_KEY);
      this.sessionUserId = decodedToken.userId;

      if (this.post.postCreateByUserId == this.sessionUserId) {
        this.isMine = true;
      }
    },
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
    deletePost(id) {
      const postId = id;
      const token = JSON.parse(localStorage.groupomaniaUser).token;

      axios({
        method: "delete",
        url: `http://localhost:3000/posts/${postId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response);
          location.reload();
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
  },
};
</script>

<style scoped>
#delete {
  cursor: pointer;
}
.bg-travail {
  background: #eb0000;
}
.bg-musique {
  background: #008246;
}
.bg-film {
  background: #8700cf;
}
.bg-sortie {
  background: #eb00b5;
}
.bg-sport {
  background: #d88b07;
}
.bg-jeux {
  background: #000bcf;
}
</style>
