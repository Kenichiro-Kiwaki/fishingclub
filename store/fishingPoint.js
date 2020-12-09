import { db } from '~/plugins/firebase.js'

export const strict = false

export const state = () => ({

})

export const mutations = {
    setUser(state, payload) {
        state.user = payload
    }
}

export const actions = {
}

export const getters = {
}