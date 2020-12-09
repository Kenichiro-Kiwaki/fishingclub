<template>
  <div class="container">
    <main id="main">
      <h2>MAIN BLOCK</h2>
      <p>ユーザーページです</p>
      <p>ようこそ{{ user.displayName }}さん</p>
      <img :src= "userPhoto" width="60px" height="60px">
      <p><nuxt-link to="/">Homeへ</nuxt-link></p>
      <button class="button is-light" @click="signOut">ログアウト</button>
    </main>
  </div>
</template>

<script>
export default {
  layout: "Users",
  data() {
    return {
      user: this.$store.getters.user,
      userPhoto: this.$store.getters.user.photoURL
    }
  },
  mounted() {
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
};
</script>

<style>
/* #main {
  box-sizing: border-box;
  margin-left: 220px;
  padding: 80px 40px;
  float: left;
} */
</style>
