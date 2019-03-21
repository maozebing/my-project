const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        roles: [],
        info: {}
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_INFO: (state, info) => {
            state.info = info
        }
    },
    actions: {

    },
    getters: {

    }
};
export default user