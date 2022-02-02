<template>
  <div class="formUnit">
    <h2 class="formUnit__title">EDIT</h2>

    <div class="formUnit__item is-box-shadow">
      <label class="formUnit-item-text jp-text" for="name">ユーザー名を変更</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="name"
          >
     </div>

    <div class="formUnit__item is-box-shadow">
        <input
         type="submit"
         value="EDIT"
         @click="edit"
         >
      </div>

    <div class="formUnit__item" v-if="errorMessage.length">
      <p class="errorText" v-for="item in errorMessage" :key="item">{{ item }}</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import form from '~/mixins/form'

  export default {
    mixins: [ form ],

    data() {
      return {
        name: '',
      }
    },

    created() {
      this.name = this.userName
    },

    methods: {
      edit() {
        this.$store.commit('setTest', 'testt');

        this.deleteErrorMessage()
        this.validEmpty(this.name) && this.setErrorMessage('emptyText')
        this.sameText(this.name, this.userName) && this.setErrorMessage('sameError')

        if(!this.errorMessage.length) {
            this.$store.dispatch('editUserDoc', {
            collectionName: 'users',
            addDataVal: this.name,
            addDataKey: 'userName'
          })
        }
      }
    },

    computed: {
      ...mapState({
        userName: state => state.userDoc?.userName
      })
    }
  }
</script>
