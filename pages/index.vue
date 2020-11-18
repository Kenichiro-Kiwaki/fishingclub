<template>
  <div class="container">
    <header id="header">
      <input>
    </header>
    <main id="main">
      <h2>MAIN BLOCK</h2>
      <p>どういうこと〜</p>
    </main>

    <aside id="sub">
      <div id="logo">LOGO</div>
      <ul>
        <li>釣り部とは</li>
        <li>使い方</li>
        <li>入部する</li>
        <li>ログイン</li>
        <li>かんたんログイン（twitterアイコン）</li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {}
</script>

<style>
  /* body {
    margin: 0;
    padding: 0;
  } */
  #header {
    float: right;
  }
  #main {
    box-sizing: border-box;
    margin-left: 220px;
    padding: 80px 40px;
    float: left;
  }
  #sub {
    box-sizing: border-box;
    height: 100%;
    width: 220px;
    position: fixed;
    overflow: auto;
    background: #eee;
    padding: 20px;
    float: left;
  }
  #logo {
    margin: o auto;
  }
</style>
