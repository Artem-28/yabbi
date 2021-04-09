import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import posts from './modules/posts'
import role from './modules/role'
import appMessage from './modules/appMessage'
import TOGGLE_ACTIVE from './modules/appMessage'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        posts,
        role,
        appMessage
    }
})