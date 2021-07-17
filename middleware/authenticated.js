export default ({
  store,
  route,
  redirect
}) => {
  if (!store.getters.isAuthenticated && route.name !== 'index') {
    redirect('/')
  }
}
