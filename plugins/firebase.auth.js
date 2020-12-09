import { auth } from '~/plugins/firebase.js'

export default (context) => {
    const { store } = context

    return new Promise((resolve, reject) => {
        auth().onAuthStateChanged(user => {
            console.log('auth worked!')
            store.commit('setUser', user)
            console.log(store.getters.user)
            resolve()
        })
    })
}