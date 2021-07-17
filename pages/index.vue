<template>
  <div class="login">
    <div class="login__left">
      <div class="login__form">
        <h2 class="login_form_title">LOGIN</h2>

        <div class="login_form_unit">
          <p class="login_form_unit__text">USER</p>
          <input type="text">
        </div>

        <div class="login_form_unit">
          <p class="login_form_unit__text">PASSWORD</p>
          <input type="text">
        </div>
      </div>
    </div>

    <div class="login__right">
      <img src="~/assets/image/login/login.jpg">
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
  console.log(this.$config.env_api_key)  // CSRなのでpublicで宣言した方しか呼べない
}
}
</script>

<style lang="scss">

  .login {
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

    &__form {
      background-color: #fff;
      padding: 30px 30px 80px;
      border-radius: .3em;
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

  .login_form_title {
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    margin-bottom: 40px;
  }

  .login_form_unit {
    +.login_form_unit {
      margin-top: 40px;
    }

    &__text {
      margin-bottom: 10px;
      color: #454545;
      font-size: 18px;
      font-family: 'Roboto', sans-serif;
    }

    input {
      background-color: #fff;
      padding: 5px 10px;
      border-radius: .3em;
      border: 1px solid #454545;
    }
  }

</style>
