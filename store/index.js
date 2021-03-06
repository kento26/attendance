import {
  auth,
  firestore
} from '~/plugins/firebase.js'

export const strict = false

export const state = () => ({
  // 認証用のデータ
  user: null,
  // 名前など認証以外のデータ
  userDoc: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },

  setUserDoc(state, payload) {
    state.userDoc = payload
  }
}

export const actions = {
  signUp({
    commit
  }, {
    email,
    password
  }) {
    return auth().createUserWithEmailAndPassword(email, password)
  },

  signInWithEmail({
    commit
  }, {
    email,
    password
  }) {
    return auth().signInWithEmailAndPassword(email, password)
  },

  signout({
    commit
  }) {
    auth().signOut()
      .then(() => {
        //stateを空に
        commit('setUser', {})
        commit('setUserDoc', {})
        this.$router.push({
          name: 'index'
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },

  /**
   * ユーザー登録 DBに登録しstateにも登録
   */
  registerUserDoc({
    commit
  }, {
    collectionName,
    uniqueID,
    userName
  }) {
    const DB = firestore().collection(collectionName).doc(uniqueID)

    DB.set({
      userName,
      uniqueID,
      createdAt: firestore.FieldValue.serverTimestamp(),

    }).then(() => {
      DB.get().then((doc) => {
        commit('setUserDoc', doc.data())
      })

    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * ユーザーデータを編集
   */
  editUserDoc({
    commit,
    state
  }, {
    collectionName,
    addDataVal,
    addDataKey
  }) {
    const {
      userDoc: {
        uniqueID: ID
      }
    } = state
    const DB = firestore().collection(collectionName).doc(ID)

    DB.update({
      [addDataKey]: addDataVal,
      updatedAt: firestore.FieldValue.serverTimestamp()

    }).then(() => {
      DB.get().then((doc) => {
        commit('setUserDoc', doc.data())
      })

    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * ユーザー削除
   */
  deleteUser({
    commit,
    state
  }, {
    collectionName
  }) {
    const {
      userDoc: {
        uniqueID: ID
      }
    } = state
    const DB = firestore().collection(collectionName).doc(ID)

    //データベース 認証データを削除
    Promise.all([DB.delete(ID), auth().currentUser.delete()]).then(results => {

      //stateを空に
      commit('setUser', {})
      commit('setUserDoc', {})
      this.$router.push({
        name: 'index'
      })
    }).catch(reject => {
      console.log(reject);
    });
  },

}

export const getters = {
  user(state) {
    return state.user
  },

  isAuthenticated(state) {
    return !!state.user
  }
}
