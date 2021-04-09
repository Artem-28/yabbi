<template>
  <article class="message is-dark post mb-6">
    <div class="message-header">
      <p>Автор: {{ post.author.fullName }}</p>
      <p>
        <span class="mr-2">{{ post.like }}</span>
        <span class="icon"><i class="fa fa-heart" /></span>
      </p>
    </div>
    <div class="message-body">
      <h3 class="is-size-4">{{ post.title }}</h3>
      {{ post.content }}
    </div>
    <div
      class="has-background-grey is-flex is-align-items-center is-justify-content-space-between pl-5 pr-5"
    >
      <p class="has-text-light pt-1 pb-1"><strong>Обновлено: </strong>{{post.update}}</p>
      <div class="buttons is-flex is-justify-content-flex-end">
        <b-button
          v-if="
            user && post.author.id === user.id && user.role.type === 'writer'
          "
          class="button is-dark"
          @click="editPost(post)"
        >
          <span class="icon"><i class="fas fa-edit"></i></span>
        </b-button>

        <b-button
          v-if="
            user && post.author.id === user.id && user.role.type === 'writer'
          "
          class="button is-dark"
          @click="removePost(post.id)"
        >
          <span class="icon"><i class="fa fa-trash"></i></span>
        </b-button>

        <b-button
          v-if="
            user 
            && (user.role.type === 'writer' || user.role.type === 'reader') 
            && user.id !== post.author.id
          "
          class="button is-dark"
          @click="like(post)"
        >
          <span class="icon"><i class="fa fa-heart-o"></i></span>
        </b-button>
      </div>
    </div>
  </article>
</template>


<script>
export default {
  name: "Post",
  props: ["post"],
  methods: {
    removePost(id) {
      this.$store.dispatch("DELETE_POST", id);
    },

    editPost(post) {
      this.$store.dispatch("EDIT_POST", post);
    },

    like(post) {
      this.$store.dispatch("LIKE_POST", post);
    },
  },

  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post {
  -webkit-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.28);
  box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.28);
}
</style>
