<template>
    <div class="container">
        <main id="main">
            <form class="form" @submit.prevent>
                <label class="label">
                    <div class="label">
                        新規登録
                        <font-awesome-icon icon="user" />
                    </div>
                </label>
                <label class="form">                    
                    <span class="label">ユーザー名</span>
                    <input type="text" placeholder="ユーザー名" v-model="displayName">
                </label>
                <label class="form">
                    <span class="label">メールアドレス</span>
                    <input type="email" placeholder="メールアドレス" v-model="email">
                </label>
                <label class="form">
                    <span class="label">パスワード</span>
                    <input type="password" placeholder="パスワード" v-model="password"><br>
                    <button @click="signUp">登録する</button>
                </label>
            </form>
        </main>
    </div>
</template>
<script>
//zxcvbnもいれたい
export default {
    layout: 'Home',
    data: function() {
        return{
            displayName: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signUp() {
            this.$store.dispatch('signUp', { email: this.email, password: this.password, displayName: this.displayName})
            this.displayName = '',
            this.email = '',
            this.password = ''
        }
    },
}
</script>