/**
 * ログインをしていない状態でindexページ以外にいる場合に
 * リダイレクト
 */
export default ({
  store,
  route,
  redirect
}) => {
  if (!store.getters.isAuthenticated && route.name !== 'index') {
    redirect('/')
  }
}
