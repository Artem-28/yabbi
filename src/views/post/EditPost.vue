<template>
  <section>
    <div
      class="conteiner is-flex is-justify-content-center is-flex-direction-column p-6 post"
    >
      <div class="is-flex is-justify-content-center is-size-3 mb-3">
        <h1>Редактировать статью </h1>
      </div>

      <b-field
        label="Название статьи"
        :type="$v.title.$error ? 'is-danger' : 'is-dark'"
        :message="$v.title.$error ? 'Введите название статьи' : null"
      >
        <b-input type="text" v-model="title" @blur="$v.title.$touch()" />
      </b-field>

      <b-field
        label="Содержимое статьи"
        :type="$v.content.$error ? 'is-danger' : 'is-dark'"
        :message="$v.content.$error ? 'Статья не должна быть пустой': null"
      >
        <b-input type="textarea" v-model="content" @blur="$v.content.$touch()" />
      </b-field>

      <div class="is-flex is-justify-content-center pt-3">
        <b-button :disabled="$v.$invalid" @click="editPost" type="is-dark">Сохранить</b-button>
      </div>

    </div>
  </section>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "EditPost",
  data() {
    return {
      title: '',
      content: '',
    };
  },
  validations: {
    title: { required },
    content: { required },
  },

  computed: {
    id() {
        return this.$route.query.id
    },
  },

  mounted(){
    this.title =  this.$store.getters.editPost.title
    this.content = this.$store.getters.editPost.content
  },

  methods: {
     editPost() {
        this.$store.dispatch('UPDATE_POST', {
            id: this.id,
            title: this.title,
            content: this.content
        })
    }
  }
};

</script>

<style scoped lang="scss">
.post {
    width: 700px;
  border-radius: 25px;
  -webkit-box-shadow: 0px 0px 26px 13px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 0px 26px 13px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 26px 13px rgba(0, 0, 0, 0.15);
}
</style>