<template>
    <div class="container">
        <main id="main">
            <h2>MAIN BLOCK</h2>
            <p>twitterログイン</p>
            <button class="button is-Primary" @click="signInWithTwitter">ログイン</button>
            <button class="button is-small" @click="signOutWithTwitter">ログアウト</button>
        </main>
    </div>
</template>
<script>
import firebase from '@/plugins/firebase'
export default {
    layout: 'Home',
    methods: {
        signInWithTwitter() {
            this.$store.dispatch('auth/authWithTwitter/twitterSignIn')
        },
        signOutWithTwitter() {
            this.$store.dispatch('auth/authWithTwitter/twitterSignOut')
        }
    }
}
</script>
<style scoped>

</style>