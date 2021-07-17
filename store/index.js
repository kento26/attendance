import {
  auth
} from '~/plugins/firebase.js'

export const strict = false

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
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

  signout() {
    auth().signOut()
      .then(() => {
        this.$router.push({
          name: 'index'
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },

  updateDisplayName({
    context
  }, name) {
    auth().currentUser.updateProfile({
        displayName: name
      })
      .then(() => {
        console.log('Update successful')
      })
      .catch((error) => {
        console.log(error)
      })
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
