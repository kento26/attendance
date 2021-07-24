<template>
  <div>
    <div class="page_Transition_bg"></div>
    <div class="userPage">

      <div class="userPage__left">
        <div class="logo" @click="changePage('dashboard')">
          <nuxt-link to="/dashboard">
          <div class="logo__image">
            <img src="~/assets/image/logo/logo_ants.svg">
          </div>
          <p class="logo__text">AntS</p>
          </nuxt-link>
        </div>

        <div class="profile">
          <div class="profile__image">
            <img src="~/assets/image/icon/icon_user03.svg">
          </div>
          <div class="profile__name">{{ userName }}</div>
        </div>

        <div class="general">
          <ul>
            <li :class="{ isCurrent: currentPage === 'dashboard' }" @click="changePage('dashboard')">
              <nuxt-link to="/dashboard">
                <p class="general__text"><fa :icon="faAddressCard" />DASHBOARD</p>
              </nuxt-link>
            </li>

            <li :class="{ isCurrent: currentPage === 'graph' }" @click="changePage('graph')">
              <nuxt-link to="/graph">
                <p class="general__text"><fa :icon="faChartBar" />GRAPH</p>
              </nuxt-link>
            </li>

            <li :class="{ isCurrent: currentPage === 'table' }" @click="changePage('table')">
              <nuxt-link to="/table">
                <p class="general__text"><fa :icon="faTable" />TABLE</p>
              </nuxt-link>
            </li>

            <li :class="{ isCurrent: currentPage === 'settings' }" @click="changePage('settings')">
              <nuxt-link to="/settings">
                <p class="general__text"><fa :icon="faCogs" />SETTINGS</p>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="signout">
          <button @click="signout"><fa :icon="faSignOutAlt" />LOGOUT</button>
        </div>
      </div>

      <div class="userPage__right">
         <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
  import { faAddressCard, faCogs, faTable, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
  import { mapState } from 'vuex'

  export default {
   name: 'user',

   data() {
      return {
        currentPage: this.$route.path.replace('/', '')
      }
    },

   methods: {
    changePage(page) {
      this.currentPage = page
    },

    signout() {
      this.$store.dispatch('signout')
    }
   },

   computed: {
    faAddressCard () {
      return faAddressCard
    },

    faCogs () {
      return faCogs
    },

    faTable () {
      return faTable
    },

    faChartBar () {
      return faChartBar
    },

    faSignOutAlt () {
      return faSignOutAlt
    },

    ...mapState({
      userName: state => state.userDoc?.userName
    })
  }
}
</script>

<style lang="scss" scoped>
  .userPage {
    width: 100%;
    display: flex;
    min-height: 100vh;

    &__left {
      background-color: #2A3F54;
      color: #E7E7E7;
      width: 18%;
      display: flex;
      flex-direction: column;

      .logo {
        margin-bottom: 10px;

        a {
          padding: 20px 10px;
          text-align: center;
          display: flex;
          font-size: 30px;
          color: #E7E7E7;
          font-family: 'Roboto', sans-serif;
          letter-spacing: .09em;
          justify-content: center;
          transition: opacity .3s ease-in;

          &:hover {
            opacity: .5;
          }
        }

        &__text {
          padding-top: 5px;
          padding-right: 35px;
        }

        &__image {
          width: 30px;
          margin-right: 15px;

          img {
            width: 100%;
            vertical-align: bottom;
          }
        }
      }

      .profile {
        padding: 0 15px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &__image {
          min-width: 50px;
          height: 50px;
          width: 50px;
          padding: 5px;
          border: 3px solid #E7E7E7;
          border-radius: 50em;
          box-sizing: border-box;
          margin-right: 15px;
          overflow: hidden;

          img {
            width: 100%;
            vertical-align: bottom;
          }
        }

        &__name {
          font-size: 18px;
          letter-spacing: .03em;
          line-height: 1.5;
          word-break: break-all;
          font-weight: 600;
        }
      }

      .general {
        ul {
          li {
            +li {
              margin-top: 5px;
            }

            &.isCurrent {
              a {
                opacity: .5;
              }
            }

            a {
              display: block;
              padding: 15px 20px;
              transition: opacity .3s ease-in;

              &:hover {
                opacity: .5;
              }
            }
          }
        }

        &__text {
          color: #E7E7E7;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: .06em;

          .fa-address-card,
          .fa-chart-bar,
          .fa-table,
          .fa-cogs {
            padding-right: 10px;
          }
        }
      }

      .signout {
        margin-top: 60px;

        button {
          transition: opacity .3s ease-in;

           &:hover {
            opacity: .5;
          }

          .fa-sign-out-alt {
            padding-right: 10px;
          }

          width: 100%;
          text-align: left;
          padding: 20px;
          color: #E7E7E7;
          font-weight: 600;
          letter-spacing: .06em;
          font-size: 18px;
        }
      }
    }

    &__right {
      background-color: #F7F7F7;
      width: 82%;
      padding: 30px;
      box-sizing: border-box;
    }
  }
</style>
