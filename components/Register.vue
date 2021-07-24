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
         placeholder="6 characters or more"
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

      <div class="formUnit__errorArea" v-if="formatErrorMessage.length">
        <p class="errorText" v-for="item in formatErrorMessage" :key="item">{{ item }}</p>
      </div>
    </div>
</template>

<script>
  import form from '~/mixins/form'

  export default {
    mixins: [ form ],

    data() {
      return {
        email: '',
        password: '',
        name: ''
      }
    },

    methods: {
      handleStatus() {
        this.$emit("changStatus", 'login')
      },

      register() {
        //エラーメッセージの配列を空に
        this.deleteErrorMessage()

        //VALIDATION
        //PASSWORD
        this.validEmpty(this.password) && this.setErrorMessage('emptyText')
        this.lengthText(this.password) && this.setErrorMessage('lengthPassword')

        //EMAIL
        this.validEmpty(this.email) && this.setErrorMessage('emptyText')
        this.validEmail(this.email) && this.setErrorMessage('emailError')

        //NAME
        this.validEmpty(this.name) && this.setErrorMessage('emptyText')

        if(!this.errorMessage.length) {
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
              this.$router.push({name: 'dashboard'})
          })
          .catch((err) => {
            this.setErrorMessage(err.code)
          })
        }
      }
    }
  }
</script>
