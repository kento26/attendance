<template>
  <div class="indexPage">
    <div class="indexPage__left">
      <transition>
        <div class="indexPage_left_item" v-show="status === 'register'">
          <Register @changStatus="toggleStatus"/>
        </div>
       </transition>

        <transition>
          <div class="indexPage_left_item" v-show="status === 'login'">
            <Login @changStatus="toggleStatus"/>
          </div>
       </transition>
    </div>

    <div class="indexPage__right">
      <transition>
        <div class="indexPage_right_image" v-show="status === 'register'">
          <img src="~/assets/image/index/pic_octopus.png">
        </div>
      </transition>

        <transition>
        <div class="indexPage_right_image" v-show="status === 'login'">
          <img src="~/assets/image/index/pic_king.png">
        </div>
      </transition>
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

<style lang="scss" scoped>
  .indexPage {
    width: 100%;
    display: flex;
    height: 100vh;

    &__left,
    &__right {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &__left {
      background-color: #eaf2f8;

      .indexPage_left_item {
        width: 60%;
      }
    }

    &__right {
      background-color: #e7effa;

      .indexPage_right_image {
        width: 300px;

        img {
          width: 100%;
          vertical-align: bottom;
        }
      }
    }

    .v-enter-active {
      transition: all .8s ease 0s;
    }

    .v-leave-active {
      transition: all .4s ease 0s;

      .formUnit {
        opacity: 0;
      }
    }

    .v-leave-active {
      position: absolute;
    }

    .v-enter,
    .v-leave-to {
      opacity: 0;
    }

    .v-enter {
      transform: translateX(-60px);
    }

    .v-enter-to,
    .v-leave {
      transform: translateX(0);
    }

    .v-leave-to {
      transform: translateX(60px);
    }
  }
</style>
