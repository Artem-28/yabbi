<template>
  <section>
    <div
      class="conteiner is-flex is-justify-content-center is-flex-direction-column p-6 reg"
    >
      <div class="is-flex is-justify-content-center is-size-3 mb-3">
        <h1>Регистрация</h1>
      </div>

      <b-field
        label="Имя"
        :type="$v.name.$error ? 'is-danger' : 'is-dark'"
        :message="!$v.name.$required && $v.name.$error ? 'Поле обязательно для заполнения': null"
      >
        <b-input v-model="name" @blur="$v.name.$touch()"></b-input>
      </b-field>

      <b-field
        label="Фамилия"
        :type="$v.lastName.$error ? 'is-danger' : 'is-dark'"
        :message="!$v.lastName.$required && $v.lastName.$error ? 'Поле обязательно для заполнения': null"
      >
        <b-input v-model="lastName" @blur="$v.lastName.$touch()"></b-input>
      </b-field>

      <b-field 
        label="Ваша роль" 
        :type="$v.role.$error ? 'is-danger' : 'is-dark'"
        :message="!$v.role.$required && $v.role.$error ? 'Поле обязательно для заполнения': null"
      >
        <b-select placeholder="Select a name" v-model="role" expanded>
          <option
            v-for="option in options"
            :value="option.id"
            :key="option.id">
            {{ option.title }}
          </option>
        </b-select>
      </b-field>

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
        :message="$v.password.$error ? 'Пароль должен содержать минимум 6 символов': null"
      >
        <b-input type="password" v-model="password" @blur="$v.password.$touch()" />
      </b-field>

      <b-field 
        label="Повторите пароль" 
        :type="$v.confirmPassword.$error ? 'is-danger' : 'is-dark'"
        :message="$v.confirmPassword.$error ? 'Пароли не совпадают' : null"
      >
        <b-input type="password" v-model="confirmPassword" @blur="$v.confirmPassword.$touch()" />
      </b-field>

      <div class="is-flex is-justify-content-center pt-3">
        <b-button 
          :disabled="$v.$invalid"
          @click="registration" 
          type="is-dark"
        >
          Регистрация
        </b-button>
      </div>

    </div>
  </section>
</template>
<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Registration",
  props: {},
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    };
  },
  validations: {
    name: { required },
    lastName: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { sameAs: sameAs("password") },
    role: { required }
  },

  computed: {
    options(){
      return this.$store.getters.roles
    }
  },

  mounted() {
    this.$store.dispatch('LOAD_ROLE')
  },

  methods: {
    registration(){
    
      this.$store.dispatch('REGISTRATION_USER', {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        role: this.role
      })
      
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