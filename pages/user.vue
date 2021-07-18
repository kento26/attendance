<template>
  <div class="">
    <Signout />

    <p>{{ userDoc }}</p>

    <Update />
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    Signout: () => import('~/components/Signout'),
    Update: () => import('~/components/Update'),

    computed: mapState(['userDoc'])
  }
</script>

<style lang="scss"></style>
