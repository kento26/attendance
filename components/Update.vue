<template>
  <div class="formUnit">
    <h2 class="formUnit__title">update</h2>
    <div class="formUnit__item">
       <label class="formUnit-item-text" for="add">ADD</label>
        <input
          type="text"
          name="add"
          id="add"
          v-model="add"
          >

      <input
        type="submit"
        value="ADD"
        @click="addAction"
        >
    </div>

    <div class="formUnit__item">
      <label class="formUnit-item-text" for="name">EDIT USER NAME</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="name"
          >

        <input
          type="submit"
          value="EDIT"
          @click="edit"
          >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        add: '',
        name: ''
      }
    },

    methods: {
      addAction() {
        this.$store.dispatch('editUserDoc', {
           collectionName: 'users',
           addDataVal: this.add,
           addDataKey: 'test01'
        })
      },

      edit() {
        this.$store.dispatch('editUserDoc', {
           collectionName: 'users',
           addDataVal: this.name,
           addDataKey: 'userName'
        })
      },
    }
  }
</script>
