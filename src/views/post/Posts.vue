<template>
    <div class="conteiner list" v-if="!!posts">
        <Post v-for="post in posts" :key="post.id" :post="post" />
        <Pagination v-if="!loading" />
    </div>
</template>

<script>
import Pagination from '../../components/Pagitation/Pagination.vue'
import Post from '../../components/Post/Post'

export default {
  name: 'Posts',
  components: {
    Post,
    Pagination
  },
  computed: {
    posts(){
      return this.$store.getters.posts
    },

    loading() {
      return this.$store.getters.loadingPosts
    }
  },
  mounted(){
    this.$store.dispatch('LOAD_POSTS')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .list {
        padding-right: 15%;
        padding-left: 15%;
        width: 100%;
        height: 500px;
    }
</style>