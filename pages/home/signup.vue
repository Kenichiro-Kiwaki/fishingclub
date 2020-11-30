<template>
    <div class="container">
        <main id="main">
            <h2>MAIN BLOCK</h2>
            <p>新規登録</p>
            ユーザー名:<input type="text"><br>
            メール:<input type="email"><br>
            パスワード:<input type="text"><br>
            <button @click="hoge">登録する</button>
            <font-awesome-icon icon="user" />
        </main>
    </div>
</template>
<script>
export default {
    methods: {
        hoge() {
            console.log('ほげ')
        }
    },
    layout: 'Home'

}
</script>
<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>