<template>
    <div id="sidebar">
        <aside id="sub">
            <div id="logo"><nuxt-link to="/">LOGO</nuxt-link></div>
            <ul>
                <li>釣り部とは</li>
                <li><nuxt-link to="/home/howtouse">使い方</nuxt-link></li>
                <li><nuxt-link to="/home/signup">入部する</nuxt-link></li>
                <li><nuxt-link to="/home/signin">ログイン</nuxt-link></li>
                <li><nuxt-link to="/home/twitter-signin">かんたんログイン（twitterアイコン）</nuxt-link></li>
            </ul>
        </aside>
    </div>
</template>

<style scoped>
#sidebar {
    box-sizing: border-box;
    height: 100%;
    width: 220px;
    position: fixed;
    overflow: auto;
    background: #eee;
    padding: 20px;
    float: left;
}
</style>