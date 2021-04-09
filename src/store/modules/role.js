import axios from 'axios'
import { ROLE_URL, SITE_URL } from './api'
import Role from '../../entity/Role'
import store from '..'

export default {
    state: {
        roles: null
    },

    getters: {
        // Получаем список ролей
        roles: state => state.roles
    },

    mutations: {
        // Сохраняем список ролей
        SET_ROLE:(state, payload) => { state.roles = payload }
    },

    actions: {
        // Загрузаем список ролей с сервера
        LOAD_ROLE: (context) => {
            axios.get(`${SITE_URL}${ROLE_URL}`)
            .then((response) => {
                const roles = response.data.map(data => new Role(data))
                context.commit('SET_ROLE', roles)
            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: error
                });
            })
        },

    }
}