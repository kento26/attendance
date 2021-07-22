<template>
    <div class="formUnit">
      <h2 class="formUnit__title">REGISTER</h2>

      <div class="formUnit__item">
        <label class="formUnit-item-text" for="email">MAIL</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
        >
      </div>

      <div class="formUnit__item">
        <label class="formUnit-item-text" for="name">USER NAME</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="name"
          >
      </div>

      <div class="formUnit__item">
        <label class="formUnit-item-text" for="password">PASSWORD</label>
        <input
         type="password"
         name="password"
         id="password"
         v-model="password"
         >
      </div>

      <div class="formUnit__item">
        <input
         type="submit"
         value="SIGN UP"
         @click="register"
         >
      </div>

      <p class="formUnit__text" @click="handleStatus">ログインはこちら</p>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        message: '',
        name: ''
      }
    },

    methods: {
      handleStatus() {
        this.$emit("changStatus", 'login')
      },

      register() {
        this.$store
          .dispatch('signUp', {
              email: this.email,
              password: this.password
          })
          .then(({user}) => {
             this.$store.dispatch('registerUserDoc', {
                 collectionName: 'users',
                 uniqueID: user.uid,
                 userName: this.name
                })
          })
          .then(() => {
              this.email = ''
              this.password = ''
              this.name = ''
              this.$router.push({
                  name: 'dashboard',
                  // params: {
                  //     dashboard_msg: true,
                  //     dashboard_msg_text:
                  //         'アカウントの登録が完了しました。'
                  // }
              })
          })
          .catch((err) => {
            this.setErrorMessage(err.code)
            console.log(err)
          })
      },

      setErrorMessage(errorCode) {
        switch (errorCode) {
          case 'auth/invalid-email':
            this.message = 'メールアドレスの形式に誤りがあります。'
            break
          case 'auth/email-already-in-use':
            this.message = '入力されたメールアドレスは既に使用されています。'
            break
          case 'auth/weak-password':
            this.message = 'パスワードは6文字以上で入力してください。'
            break
          default:
            this.message = '新規登録に失敗しました。'
            break
        }
      }
    }
  }
</script>
