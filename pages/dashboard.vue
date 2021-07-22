<template>
  <div class="dashboard">
    <div class="dashboard__unit" v-for="item in attendanceData" :key="item.target">
      <Attendance :name='item.name' :target='item.target' />
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'user',

    components: {
      Attendance: () => import('~/components/user/Attendance')
    },

    data() {
      return {
        attendanceData: [
          {
            name: '出勤',
            target: 'workStart'
          },
          {
            name: '休憩 開始',
            target: 'breakStart'
          },
          {
           name: '休憩 終了',
            target: 'breakEnd'
          },
          {
            name: '退勤',
            target: 'workEnd'
          },
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &__unit {
      padding: 40px;
      background-color: #fff;
      border-radius: .5em;

      +.dashboard__unit {
        margin-top: 25px;
      }
    }
  }

  .attendance {
    display: flex;

    &__button {
      margin-right: 40px;
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
