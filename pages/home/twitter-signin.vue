<template>
    <div class="container">
        <main id="main">
            <h2>MAIN BLOCK</h2>
            <button @click="twitterLogin">twitterでログイン</button>  
        </main>
    </div>
</template>
<script>
export default {
    layout: 'Home',
    computed: {
    },
    data () {
        return {
        }
    },
    methods : {
        twitterLogin () {
            this.$store.dispatch('signInWithTwitter')
        },
    }
}
</script>
<style scoped>

</style>