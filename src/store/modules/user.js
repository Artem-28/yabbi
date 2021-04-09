import axios from 'axios'
import Role from '../../entity/Role'
import User from '../../entity/User'
import Vue from 'vue';
import { isUniqueEmail } from '../../helpers/unique'
import router from '../../router'
import {ROLE_URL, SITE_URL, USERS_URL } from './api'
import store from '..';
export default {
    state: {
        user: null
    },
    mutations: {
        // Сохранит авторизованного юзера
        SET_USER: (state, payload) => {state.user = payload},

        // Очистить юзера
        CLEAR_USER: state => state.user = null
        
    },

    getters: {
        // Получить текущего юзера
        currentUser: state => state.user
    },
    actions: {

        // Выход из приложения
        LOGOUT: context => {
            context.commit('CLEAR_USER')
            router.push('/login')
        },

        // Регистрация нового пользователя
        REGISTRATION_USER: (context, payload) => {

            axios.get(`${SITE_URL}${USERS_URL}`)
            .then((response) => {
                const users = response.data

                if(isUniqueEmail(users, payload.email)){
                    context.dispatch('CREATE_USER', payload)
                } else {
                    store.dispatch('SEND_MESSAGE', {
                        isError: true,
                        message: 'Данный email уже существует'
                    });
                }
            
            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: error
                });
            })
        },

        // Сохранение нового пользователя в базу
        CREATE_USER: (context, payload) => {
            
            axios.post(`${SITE_URL}${USERS_URL}`, {
                name: payload.name,
                last_name: payload.lastName,
                email: payload.email,
                password: payload.password,
                role_id: payload.role
            })
            .then((response) => {

                store.dispatch('SEND_MESSAGE', {
                    isError: false,
                    message: 'Поздравляем! Регистрация прошла успешно'
                });

                router.push('/login')
            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: error
                });
            })
        },

        // Получение роли пользователя
        GET_ROLE:(context, payload) => {

            axios.get(`${SITE_URL}${ROLE_URL}?id=${payload.roleId}`)
            .then((response) => {
               
                const role = new Role(response.data[0])
                payload.setRole(role)
                context.commit('SET_USER', payload)
                router.push({path: '/'})
            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: 'Ошибка загрузки роли пользователя'
                });
            })
        },

        // Авторизация пользователя
        LOGIN:(context, payload) => {
            axios.get(`${SITE_URL}${USERS_URL}?email=${payload.email}`)
            .then((response) => {
                const userData = response.data[0]

                if(userData.password === payload.password){

                    const user = new User(userData)
                    context.dispatch('GET_ROLE', user)

                    store.dispatch('SEND_MESSAGE', {
                        isError: false,
                        message: 'Авторизация прошла успешно'
                    });

                } else {

                    store.dispatch('SEND_MESSAGE', {
                        isError: true,
                        message: 'Неверный логин или пароль'
                    });
                   
                }   

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