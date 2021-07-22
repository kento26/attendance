<template>
  <div class="">
    <p>テーブル</p>

    <!-- <p>{{ time }}</p> -->

    <div class="" v-for="item in time" :key="item.date">
      <p>{{ item.date }}</p>
      <p>{{ item.workStart }}</p>
      <p>{{ item.workEnd }}</p>
      <p>{{ item.breakStart }}</p>
      <p>{{ item.breakEnd }}</p>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    layout: 'user',

    computed: {
      ...mapState({
        time: state => {
          const {userDoc} = state
          const reg = new RegExp('^time_','g');

          return userDoc ? Object.keys(userDoc).reduce((r, o) => {
            if(o.match(reg)) {
              userDoc[o].date = o
              r.push(userDoc[o])
            }
            return r
          }, []).reverse() : []
        }
      })
    }
  }
</script>

<style lang="scss"></style>
