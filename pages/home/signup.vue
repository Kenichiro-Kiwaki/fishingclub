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
                    <input type="text" v-model="userName">
                </label>
                <label class="form">
                    <span class="label">メールアドレス</span>
                    <input type="email" v-model="email">
                </label>
                <label class="form">
                    <span class="label">パスワード</span>
                    <input type="password" v-model="password"><br>
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
            userName: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signUp() {
            this.$store.dispatch('signUp', { email: this.email, password: this.password })
            .then((user) => {
                this.userName = '',
                this.email = '',
                this.password = ''
                this.$router.push('/users/loginUser')
            })
            .catch((err) => {
                alert(err)
            })
        }
    },
}
</script>