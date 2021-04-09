<template>
  <section>
    <div
      class="conteiner is-flex is-justify-content-center is-flex-direction-column p-6 reg"
    >
      <div class="is-flex is-justify-content-center is-size-3 mb-3">
        <h1>Авторизация</h1>
      </div>

      <b-field
        label="Email"
        :type="$v.email.$error ? 'is-danger' : 'is-dark'"
        :message="$v.email.$error ? 'Некорректный email' : null"
      >
        <b-input type="email" v-model="email" @blur="$v.email.$touch()" />
      </b-field>

      <b-field
        label="Пароль"
        :type="$v.password.$error ? 'is-danger' : 'is-dark'"
        :message="$v.password.$error ? 'Поле обязательно для заполнения': null"
      >
        <b-input type="password" v-model="password" @blur="$v.password.$touch()" />
      </b-field>

      <div class="is-flex is-justify-content-center pt-3">
        <b-button 
          :disabled="$v.$invalid" 
          type="is-dark"
          @click="login"
        >
          Войти
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  props: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { required, email },
    password: { required },
  },

  methods: {
    login(){
      this.$store.dispatch('LOGIN', {email: this.email, password: this.password})
    }
  }
};

</script>

<style scoped lang="scss">
.reg {
  width: 500px;
  border-radius: 25px;
  -webkit-box-shadow: 0px 0px 26px 13px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 0px 26px 13px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 26px 13px rgba(0, 0, 0, 0.15);
}
</style>