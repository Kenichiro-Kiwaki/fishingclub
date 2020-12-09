<template>
    <div class="container">
        <main id="main">
            <form class="form" @submit.prevent>
                <label class="label">
                    <div class="label">
                        ログイン
                        <font-awesome-icon icon="user" />
                    </div>
                </label>
                <label class="form">
                    <span class="label">メールアドレス</span>
                    <input type="email" placeholder="メールアドレス" v-model="email">
                </label>
                <label class="form">
                    <span class="label">パスワード</span>
                    <input type="password" placeholder="パスワード" v-model="password"><br>
                    <button @click="signIn" @submit.prevent>登録する</button>
                </label>
            </form>
        </main>
    </div>
</template>
<script>
//zxcvbnもいれたい
export default {
    layout: 'Home',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signIn() {
            this.$store.dispatch('signInWithEmail', { email: this.email, password: this.password })
        }
    }
}
</script>
<style scoped>

</style>