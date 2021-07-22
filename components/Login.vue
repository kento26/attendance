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
    </div>
</template>

<script>
  export default {
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
            // this.setErrorMessage(err.code)
            console.log(err)
          })
      },
     }
  }
</script>
