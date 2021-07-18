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

    <div class="formUnit__item">
      <input
        type="submit"
        value="START"
        @click="timeAction('morning')"
        >
    </div>

    <div class="formUnit__item">
      <input
        type="submit"
        value="END"
        @click="timeAction('night')"
        >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        add: '',
        name: '',
        start: '',
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

      timeAction(timeText) {
        const today = new Date();
        const key = today.getFullYear() + '_' + (Number(today.getMonth()) + 1) + '_'+ today.getDate()
        const time = today.getHours() + ':' + today.getMinutes()

        this.$store.dispatch('editUserDoc', {
           collectionName: 'users',
           addDataVal: time,
           addDataKey: 'time_' + String(key) + '.' + timeText
        })
      },
    }
  }
</script>
