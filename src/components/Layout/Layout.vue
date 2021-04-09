<template>
    <div class="conteiner app">
        <App-message />
        <Header :links = "links"/>
        <div class="conteiner is-flex is-justify-content-center pt-6">
            <router-view/>
        </div>
    </div>
</template>

<script>
import AppMessage from '../AppMessage/AppMessage.vue'

import Header from '../Header/Header'

export default {
  name: 'Layout',
  components: {
    Header,
    AppMessage
  },
  computed: {
    links() {
      const user = this.$store.getters.currentUser
      if(user && user.role.type === 'writer'){
        return {
          menu: [
            {id: 1, title: 'Список статей', url: '/'},
            {id: 2, title: 'Опубликовать статью', url: '/new-post'}
          ],
          auth: []
        }
      }
      if(user){
        return {
          menu: [{id: 1, title: 'Список статей', url: '/'}],
          auth: []
        }
      }else {
        return {
          menu: [{id: 1, title: 'Список статей', url: '/'}],
          auth: [
            {id: 3, title: 'Регистрация', url: '/registration'},
            {id: 4, title: 'Войти', url: '/login'},
          ]
        }
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>