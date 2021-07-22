<template>
  <div class="formUnit">
    <h2 class="formUnit__title">DELETE</h2>
    <div class="formUnit__item">
      <input
        type="submit"
        value="DELETE"
        @click="deleteAction"
        >
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      deleteAction() {
         this.$store.dispatch('deleteUser', {
           collectionName: 'users',
        })
      }
    }
  }
</script>
