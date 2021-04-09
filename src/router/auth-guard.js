import store from '../store/index'

export default function (to, from, next){
    const user = store.state.user.user
    if(!user)
        next()
    else {
        next('/login?loginError=true')
    }
}