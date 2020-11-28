<template>
    <div class="container">
        <main id="main">
            <h2>MAIN BLOCK</h2>
            <button @click="login">ログイン</button>  
        </main>
    </div>
</template>
<script>
import Cookies from 'universal-cookie'
export default {
    layout: 'Home',
    methods: {
        login () {
            const cookies = new Cookies()
            cookies.set('credential', 'true', { maxage: 90 })
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>

</style>