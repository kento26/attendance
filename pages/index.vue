<template>
  <div class="indexPage">
    <div class="indexPage__left" v-if="status === 'register'">
      <Register @changStatus="toggleStatus"/>
    </div>
    <div class="indexPage__left" v-if="status === 'login'">
      <Login @changStatus="toggleStatus"/>
    </div>

    <div class="indexPage__right">
      <img src="~/assets/image/login/login.jpg">
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      Register: () => import('~/components/Register'),
      Login: () => import('~/components/Login')
    },

    data() {
      return {
        status: 'register',
      }
    },

    methods: {
      toggleStatus(text) {
        this.status = text
      }
    }
}
</script>

<style lang="scss">
  .indexPage {
    width: 100%;
    display: flex;
    background-color: #2c3338;

    &__left,
    &__right {
      width: 50%;
    }

    &__left {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__right {
      height: 100vh;

      img {
        width: 100%;
        height: 100%;
        vertical-align: bottom;
      }
    }
  }
</style>
