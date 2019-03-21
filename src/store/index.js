import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {
        token: state => state.user.token,
        avatar: state => state.user.avatar,
        nickname: state => state.user.name,
        welcome: state => state.user.welcome,
        roles: state => state.user.roles,
        userInfo: state => state.user.info,
    }
})
