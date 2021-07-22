<template>
  <div class="">
    <Signout />

    <p>name</p>
    <p>{{ userName }}</p>
    <!-- <p>{{ userDoc }}</p> -->

    <p>time</p>
    <p>{{ time }}</p>

    <Update />

    <Delete />
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    Signout: () => import('~/components/Signout'),
    Update: () => import('~/components/Update'),
    Delete: () => import('~/components/Delete'),

    computed: {
      ...mapState(['userDoc']),

      ...mapState({
        time: state => {
          const {userDoc} = state
          const reg = new RegExp('^time_','g');
          return Object.keys(userDoc).reduce((r, o) => {
            if(o.match(reg)) {
              userDoc[o].date = o
              r.push(userDoc[o])
            }
            return r
          }, [])
        },

        userName: state => state.userDoc.userName
      })
    }
  }
</script>

<style lang="scss"></style>
