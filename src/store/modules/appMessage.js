
export default {
    state: {
        isActive: false,
        isError: false,
        message: ''
    },

    getters: {
        appMessageIsActive: state => state.isActive,

        appMessageIsError: state => state.isError,

        appMessageIsSuccess: state => state.isSuccess,

        appMessage: state => state.message
    },

    mutations: {
        SET_TOGGLE_ACTIVE:(state, payload) => {
            state.isActive = payload
        }, 

        SET_SEND_MESSAGE: (state, payload) => {
            state.isActive = true,
            state.message = payload.message
            state.isError = payload.isError
        }
    },

    actions: {
        TOGGLE_ACTIVE:(context, payload) => {
            context.commit('SET_TOGGLE_ACTIVE', payload)
        },

        SEND_MESSAGE: (context, payload) => {
            context.commit('SET_SEND_MESSAGE', payload)
        }
    }
}