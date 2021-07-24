<template>
    <div class="formUnit">
      <h2 class="formUnit__title">LOGIN</h2>

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
        <label class="formUnit-item-text" for="password">PASSWORD</label>
        <input
         type="password"
         name="password"
         id="password"
         placeholder="6 characters or more"
         v-model="password"
         >
      </div>

       <div class="formUnit__item">
        <input
         type="submit"
         value="LOGIN"
         @click="login"
         >
      </div>

      <p class="formUnit__text" @click="handleStatus">登録はこちら</p>

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
      }
    },

     methods: {
      handleStatus() {
        this.$emit("changStatus", 'register')
       },

       login() {
        //エラーメッセージの配列を空に
        this.deleteErrorMessage()

        //VALIDATION
        //PASSWORD
        this.validEmpty(this.password) && this.setErrorMessage('emptyText')
        this.lengthText(this.password) && this.setErrorMessage('lengthPassword')

        //EMAIL
        this.validEmpty(this.email) && this.setErrorMessage('emptyText')
        this.validEmail(this.email) && this.setErrorMessage('emailError')

        if(!this.errorMessage.length) {
          this.$store
            .dispatch('signInWithEmail', {
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.email = ''
                this.password = ''
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
