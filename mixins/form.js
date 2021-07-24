export default {
  data() {
    return {
      errorMessage: [],
    }
  },

  methods: {
    validEmpty(data) {
      if (data === null || data === undefined || data === '') return true
      return false
    },

    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return !re.test(email)
    },

    sameText(text01, text02) {
      if (text01 === text02) return true
      return false
    },

    lengthText(text) {
      return text.length < 6
    },

    deleteErrorMessage() {
      this.errorMessage.splice(0, this.errorMessage.length)
    },

    setErrorMessage(errorCode) {
      switch (errorCode) {
        case 'auth/invalid-email':
          this.errorMessage.push('メールアドレスの形式に誤りがあります。')
          break

        case 'auth/email-already-in-use':
          this.errorMessage.push('入力されたメールアドレスは既に使用されています。')
          break

        case 'auth/weak-password':
          this.errorMessage.push('パスワードは6文字以上で入力してください。')
          break

        case 'auth/wrong-password':
          // The password is invalid or the user does not have a password
          // パスワードが違うと言っているがメッセージは曖昧にする
          this.errorMessage.push('メールアドレスまたはパスワードに誤りがあります。')
          break

        case 'auth/user-not-found':
          //There is no user record corresponding to this identifier. The user may have been deleted
          this.errorMessage.push('メールアドレスまたはパスワードに誤りがあります。')
          break

        case 'emptyText':
          this.errorMessage.push('未入力の項目があります。')
          break

        case 'sameError':
          this.errorMessage.push('名前が変更されていません。')
          break

        case 'emailError':
          this.errorMessage.push('メールアドレスの形式に誤りがあります。')
          break

        case 'lengthPassword':
          this.errorMessage.push('パスワードは6文字以上で入力してください。')
          break

        default:
          this.errorMessage.push('ネットワークエラー しばらくしてから再度お試しください。')
          break
      }
    }
  },

  computed: {
    formatErrorMessage() {
      return [...new Set(this.errorMessage)]
    }
  }
}
