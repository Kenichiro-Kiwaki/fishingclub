<template>
  <div class="container">
    <main id="main">
      <h2>MAIN BLOCK</h2>
      <p>ユーザーページです</p>
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
    };
  },
  mounted() {
  },
  methods: {
    signOut: function(err) {
      this.$store
        .dispatch('signOut')
        .then(() => {
          console.log('moved')
          this.$router.push({
            name:'index'
          })
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }
};
</script>

<style>
#main {
  box-sizing: border-box;
  margin-left: 220px;
  padding: 80px 40px;
  float: left;
}
</style>
