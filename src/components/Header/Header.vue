<template>
    <b-navbar class="is-dark px-6">

        <template #start>
            <b-navbar-item 
                tag="router-link" 
                v-for="link in links.menu"
                :key="link.id"
                :to="link.url"
            >
                {{link.title}}
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                <a
                    v-for="link in links.auth"
                    :key="link.id" 
                    class="button is-info"  
                    @click="toLink(link.url)"
                >
                    {{link.title}}
                </a>
                <a
                    v-if="user"
                    class="button is-info"  
                    @click="logout"
                >
                    Выйти
                </a>
                </div>
            </b-navbar-item>
        </template>

    </b-navbar>
</template>

<script>
import router from '../../router/index'
export default {
  name: 'Header',
  props: ['links'],
  methods: {
      toLink: url => router.push(url),
    
      logout() {
          this.$store.dispatch('LOGOUT')
      }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser
        }
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>