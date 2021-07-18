import {
  auth,
  firestore
} from '~/plugins/firebase.js'

/**
 * 現在ログインしているユーザーを取得し
 * storeに格納
 * 同時にDBのデータも取得し格納
 */
export default (context) => {
  const {
    store
  } = context

  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged(user => {
      if (user) {
        store.commit('setUser', user)
        firestore().collection('users').doc(user.uid).get().then((doc) => {
          store.commit('setUserDoc', doc.data())
          resolve()
        })

      } else {
        resolve()
      }
    })
  })
}
