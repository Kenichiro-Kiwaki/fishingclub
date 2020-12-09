import { auth, db } from '~/plugins/firebase.js'

export const strict = false

export const state = () => ({
    user: null
})

export const mutations = {
    setUser(state, payload) {
        state.user = payload
    }
}

export const actions = {
    signUp({ commit }, { email, password, displayName }) {
        auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            result.user.updateProfile({ displayName: displayName })
            // .then(() => { })
            .catch(err => { alert(err) })
            console.log('user Uodated')
            db.collection('users').add({
                displayName: displayName,
                email: email,
                password: password
            })
            .then(() => {
                console.log("Document successfully written!")
                $nuxt.$router.push('/users/loginUser')
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            })
        })
        .catch((err) => {
            alert(err)
        })    
    },
    
    signInWithEmail({ commit }, { email, password }) {
        auth().signInWithEmailAndPassword(email, password)
        .then(() => {    
            $nuxt.$router.push('/users/loginUser')
        })
        .catch(err => {
            console.log(err)    
        })
    },

    signInWithTwitter({ commit }) {
        auth().signInWithPopup(new auth.TwitterAuthProvider())
        .then(() => {
            //ここだけthis.$routerでも遷移できる謎
            $nuxt.$router.push('/users/loginUser')
        })
        .catch((err) => {
            console.log('現在Twitterでのログインは使用できません。後ほどお試しください。')
        })
    },

    signOut() {
        auth().signOut()
        .then(() => {
            console.log('moved')
            this.$router.push({
              name:'index'
            })
        })
        .catch((err) => {
            alert(err.message)
        })  
    }
}

export const getters = {
    user(state) {
        return state.user
    },
    isAuthenticated(state) {
        return !!state.user
    }
}