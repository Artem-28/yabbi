import axios from 'axios'
import store from '..'
import Post from '../../entity/Post'
import User from '../../entity/User'
import router from '../../router'
import { POSTS_URL, SITE_URL, USERS_URL } from './api'

export default {
    state: {
        posts: [],
        editPost: null,
        paginate: {
            total: 13,
            current: 1,
            perPage: 10,
        },
        loading: false
    },

    getters: {
        // Получаем список постов
        posts: state => state.posts,

        // Получить пост для редактирования
        editPost: state => state.editPost,

        //Получить объект пагинации
        paginate: state => state.paginate,

        //Получить loader
        loadingPosts: state => state.loadng
        
    },

    mutations: {
        // Сохраняем список постов
        SET_POSTS: (state, payload) => state.posts = [...state.posts, payload],

        // Очищаем список постов
        CLEAR_POSTS: state => state.posts = [],

        // Сохранить выбраный пост для редактирования
        SET_EDIT_POST: (state, payload) => state.editPost = payload,

        // Сохранить объект пагинации
        SET_PAGINATE: (state, payload) => {
            state.paginate.perPage = payload.perPage
            state.paginate.current = payload.current
        },

        // Сохранить общее колличество посто из базы
        SET_TOTAL_POSTS: (state, payload) => state.paginate.total = +payload,

        // Переключаем загрузку
        LOADING:(state, payload) => state.loadng = payload
    },
    actions: {

        // диспатчим объект пагинации
        PAGINATE:(context, payload) => {
            context.commit('SET_PAGINATE', payload)
            context.dispatch('LOAD_POSTS')
        },

        // Загрузка постов из базы
        LOAD_POSTS: (context) => {
            context.commit('LOADING', true)
            context.commit('CLEAR_POSTS')

            const page = context.getters.paginate.current
            const limit = context.getters.paginate.perPage

            axios.get(`${SITE_URL}${POSTS_URL}/?_page=${page}&_limit=${limit}`)
            .then(response => {
                const total = response.headers['x-total-count']
                context.commit('SET_TOTAL_POSTS', total)
                response.data.map(data => {
                    const post = new Post(data)
                    context.dispatch('GET_AUTHOR', post)
                })
                context.commit('LOADING', false)
            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: error
                });
            })
        },

        // Сохраняем отредактированный пост в базу
        UPDATE_POST: (context, payload) => {
            axios.patch(`${SITE_URL}${POSTS_URL}/${payload.id}`, {
                title: payload.title,
                content: payload.content,
                update_at: new Date()
            })
            .then(response => {
                store.dispatch('SEND_MESSAGE', {
                    isError: false,
                    message: `Пост ${payload.title}, успешно изменен!`
                });
                router.push({path: '/'})
            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: `Пост ${payload.title}, не сохранен! ${error}`
                });
            })
        },

        // Сохраняем лайк для поста
        LIKE_POST: (context, payload) => {
            axios.patch(`${SITE_URL}${POSTS_URL}/${payload.id}`, {
                like:1 + payload.like ,
            })
            .then((response)=> payload.setLike(1))
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: error
                });
            })
        },

        // Получаем выбранный пост
        EDIT_POST: (context, payload) => {
            context.commit('SET_EDIT_POST', payload)
            router.push({path: '/post/edit', query: {id: payload.id}})
        },


        // Получаем авторов для постов
        GET_AUTHOR: (context, payload) => {
            axios.get(`${SITE_URL}${USERS_URL}?id=${payload.userId}`)
            .then((response)=>{
                const author = new User(response.data[0])
                payload.setAuthor(author)
                context.commit('SET_POSTS', payload)
            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: `${error} Не удалось получить авторов`
                });
            })
        },

        // Добавляем новый пост в базу
        ADD_POST: (content, payload) => {
            axios.post(`${SITE_URL}${POSTS_URL}`, {
                title: payload.title,
                content: payload.content,
                like: 0,
                user_id: payload.userId,
                created_at: new Date(),
                update_at: new Date()

            })
            .then(response => {
                store.dispatch('SEND_MESSAGE', {
                    isError: false,
                    message: `Создан новый пост:${payload.title}`
                });
                router.push({path: '/'})
            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: `${error} не удалось сохранить пост`
                });
            })
        },

        // Удаляем пост из базы
        DELETE_POST:(context, payload) => {

            axios.delete(`${SITE_URL}${POSTS_URL}/${payload}`)
            .then(response => {
                store.dispatch('SEND_MESSAGE', {
                    isError: false,
                    message: `Пост успешно удален`
                });
                context.dispatch('LOAD_POSTS')

            })
            .catch(error => {
                store.dispatch('SEND_MESSAGE', {
                    isError: true,
                    message: `${error} не удалось удалить пост`
                });
            })
        }
    }, 
}
