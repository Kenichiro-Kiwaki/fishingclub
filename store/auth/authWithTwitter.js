export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
    twitterSignIn() {
        let provider = new firebase.auth.TwitterAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            let token = result.credential.accessToken;
            let secret = result.credential.secret;
            // The signed-in user info.
            let user = result.user;
            console.log(result)
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        })
    },
    twitterSignOut() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('サインアウトしました。')
          }).catch(function(error) {
            // An error happened.
            
          });
    }
}