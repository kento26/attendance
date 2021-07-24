<template>
  <div class="formUnit">
    <h2 class="formUnit__title">DELETE</h2>
    <div class="formUnit__item is-box-shadow">
      <p class="formUnit-item-text jp-text">アカウントを削除</p>
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
