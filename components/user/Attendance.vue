<template>
  <div class="attendance">
    <div class="attendance__button">
      <button
        @click="attendanceAction(target)"
         :class="{ isSettled: selfTime }">
         {{ name }}
      </button>
    </div>
    <div class="attendance__text">
      <p>時間</p>
      <p>{{ selfTime }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['name', 'target'],

    data() {
      return {
        flag: true,
      }
    },

    methods: {
      attendanceAction(target) {

        console.log(this.$store.state.test);
        //まだ押してない場合のみ押せる
        if(!this.flag) return

        const newDate = new Date();
        const today = newDate.getFullYear() + '_' + (Number(newDate.getMonth()) + 1) + '_' + newDate.getDate()
        const _currentHours = newDate.getHours();
        const _currentMinutes = newDate.getMinutes();
        const currentHours = ('0' + _currentHours).slice(-2);
        const currentMinutes = ('0' + _currentMinutes).slice(-2);
        const time = currentHours + ':' + currentMinutes

        this.$store.dispatch('editUserDoc', {
          collectionName: 'users',
          addDataVal: time,
          addDataKey: 'time_' + String(today) + '.' + target
        })
      },
    },

    computed: {
      //出勤時間など自分自身の時間を取得して返す
      selfTime() {
        let result = ''
        const newDate = new Date();
        const today = newDate.getFullYear() + '_' + (Number(newDate.getMonth()) + 1) + '_' + newDate.getDate()
        const reg = new RegExp(`^time_${today}`, 'g')
        const userDoc = this.$store.state.userDoc

        if(userDoc) {
          result = Object.keys(userDoc).reduce((r, o) => {
            if(o.match(reg)) {
              if(userDoc[o][this.target]) {
                r = userDoc[o][this.target]
                this.flag = false
              }
            }
            return r
          }, '')
        }
        return result
      }
    }
  }
</script>

<style lang="scss" scoped>
  .attendance {
    display: flex;

    &__button {
      margin-right: 40px;
      min-width: 200px;
      width: 200px;

      button {
        width: 100%;
        padding: 30px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: .06em;
        transition: opacity .3s ease-in;
        background-color: #89b7e6;
        border-radius: .5em;

        &:hover {
          opacity: .5;
        }

         &.isSettled {
          pointer-events: none;
          background-color: #616161;
        }
      }
    }

    &__text {
      p {
         font-size: 18px;
         letter-spacing: .06em;

         +p {
           margin-top: 10px;
         }
      }
    }
  }
</style>
