import { createStore } from "vuex";
import { postModule } from '@/store/postModule'

export default createStore({
    state: {
        isAuth: false,
    },
    mutations: {
        setIsAuth(state, isAuth) {
            state.isAuth = isAuth
        },
    },
    modules: {
        post: postModule
    },
})