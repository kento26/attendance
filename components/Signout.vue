<template>
  <div class="formUnit">
    <h2 class="formUnit__title">signOut</h2>
    <div class="formUnit__item">
      <input
        type="submit"
        value="signout"
        @click="signout"
        >
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      signout() {
        this.$store.dispatch('signout')
      }
    }
  }
</script>
