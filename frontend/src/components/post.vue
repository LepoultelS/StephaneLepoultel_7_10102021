<template>
  <div class="login row justify-center items-center q-py-md">
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
      <div class="row">
        <q-card square class="login-form flat">
          <q-card-section class="q-pt-xs">
            <div class="row">
              <div class="text-overline col">
                <q-icon size="md" color="primary" name="account_circle" />
                {{ post.postCreateByUserFirstname }}
                {{ post.postCreateByUserName }}
              </div>
              <div v-if="isPostMine || user.admin == 1">
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

          <q-card-section
            class="row flex flex-center text-caption text-secondary"
          >
            <div class="col">
              {{ dateFormat(post.postCreationDate) }}
            </div>
            <div class="col-5"></div>
            <div @click="iscommentChange()" id="commentShow">
              {{ numcomment }} Commentaires
            </div>
          </q-card-section>
          <q-card-section v-if="iscomment">
            <div
              v-for="comment in comment"
              v-bind:key="comment.id"
              class="text-caption q-pt-sm"
            >
              <div class="row text-overline">
                <div class="col">
                  <q-icon size="md" color="primary" name="account_circle" />
                  {{ comment.commentCreateByUserFirstname }}
                  {{ comment.commentCreateByUserName }}
                </div>
                <div
                  v-if="
                    comment.commentCreateByUserId == user.id ||
                      isCommentMine ||
                      user.admin == 1
                  "
                >
                  <q-icon
                    id="delete"
                    name="delete"
                    @click="deleteComment(comment.commentId)"
                  />
                </div>
              </div>
              <div>
                {{ comment.commentMessage }}
              </div>
              <div class="col text-caption text-secondary">
                {{ dateFormat(comment.commentCreationDate) }}
              </div>
              <q-separator />
            </div>
            <div
              class="row flex flex-center text-caption text-secondary q-pt-lg"
            >
              <q-input
                dense
                v-model="commentText"
                type="text"
                label="Commenter"
                class="col q-pr-lg"
              >
                <template v-slot:prepend>
                  <q-icon name="add_comment" />
                </template>
              </q-input>
              <q-btn @click="addComment()">
                Envoyer
              </q-btn>
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
import router from "../router/index";

export default {
  name: "post",

  data: () => ({
    colorBadge: "",
    isPostMine: false,
    isCommentMine: false,
    iscomment: false,
    commentText: "",
    comment: [],
    numcomment: "",
  }),

  props: {
    post: [],
    user: [],
  },

  created() {
    this.checkIsPostMine();
    this.getComments();
    this.colorBadge = this.post.postTag;
  },

  methods: {
    iscommentChange() {
      if (this.iscomment == false) {
        this.iscomment = true;
      } else {
        this.iscomment = false;
      }
    },
    checkIsPostMine() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;
      let decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_KEY);
      this.sessionUserId = decodedToken.userId;

      if (this.post.postCreateByUserId == this.sessionUserId) {
        this.isPostMine = true;
        this.isCommentMine = true;
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
          router.go();
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
    deleteComment(id) {
      const commentId = id;
      const token = JSON.parse(localStorage.groupomaniaUser).token;

      axios({
        method: "delete",
        url: `http://localhost:3000/comments/${commentId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response);
          router.go();
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
    addComment() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;

      axios({
        method: "post",
        url: "http://localhost:3000/comments",
        headers: { Authorization: `Bearer ${token}` },
        data: {
          postId: this.post.postId,
          message: this.commentText,
        },
      })
        .then(function() {
          router.go();
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
    },
    getComments() {
      const token = JSON.parse(localStorage.groupomaniaUser).token;
      const postId = this.post.postId;

      axios({
        method: "get",
        url: `http://localhost:3000/comments/${postId}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.comment = response.data;
          this.numcomment = this.comment.length;
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    },
  },
};
</script>

<style scoped>
#delete,
#commentShow {
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
