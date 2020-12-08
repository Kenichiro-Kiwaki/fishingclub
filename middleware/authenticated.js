export default ({ store, route, redirect }) => {

    if (!store.getters.isAuthenticated && route.name === 'users-loginUser') {
        redirect('/')
        alert('ログインもしくは新規登録してください。')
    }
    if (store.getters.isAuthenticated && (route.name === 'index' ||
        route.name === 'home-howtouse' ||
        route.name === 'home-signin' ||
        route.name === 'home-signup' ||
        route.name === 'home-twitter-signin'
        )) {
        redirect('/users/loginUser')
    }
}