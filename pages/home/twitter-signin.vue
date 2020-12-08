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
            .then(() => {
                this.$router.push('/users/loginUser')
            })
            .catch((err) => {
                console.log('現在Twitterでのログインは使用できません。後ほどお試しください。')
            })
        },
    }
}
</script>
<style scoped>

</style>