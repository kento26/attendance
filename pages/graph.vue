<template>
  <div class="graph">
    <div class="graph__nav">
      <p class="graph_nav_text">日付を選択</p>

      <div class="selectBox">
        <select v-model="yearSelected">
          <option v-for="yearItem in year" :value="yearItem.value" :key="yearItem.value">
            {{ yearItem.label }}
          </option>
        </select>
      </div>

      <div class="selectBox">
        <select v-model="monthSelected">
          <option v-for="monthItem in month" :value="monthItem.value" :key="monthItem.value">
            {{ monthItem.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="graph__content">
      <LineChart :chart-data="datacollection" :options="options" />
    </div>
  </div>
</template>

<script>
  import selectTime from '~/mixins/selectTime'

  export default {
    layout: 'user',
    mixins: [ selectTime ],

    components: {
      LineChart: () => import('~/components/user/LineChart'),
    },

     data () {
      return {
        datacollection: {},
        options: {},
      }
    },

    methods: {
      setTimeData() {
        const selectData = this.getSelectDate

        const setData = selectData.reduce((r, {date, workStart, workEnd}) => {
          if(workStart && workEnd) {
              const [fromHour, fromMinute] = workStart.split(':')
              const [toHour, toMinute] = workEnd.split(':')
              let diffTime = toHour - fromHour + (toMinute - fromMinute) / 60.0

              diffTime = (Math.round(diffTime * 100) / 100) -1
              r.labels.push(`${date.split('_')[2]}/${date.split('_')[3]}`)
              r.time.push(diffTime)
            }

          return r
        }, {labels: [], time:[]})

        this.datacollection = {
          labels: setData.labels,
          datasets:[{
            label: '労働時間 (Hour)',
            data: setData.time,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
          }],
        }
      }
    },

    watch: {
      getSelectDate: function() {
        this.setTimeData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .graph {
    display: flex;

    &__nav {
      width: 200px;
      margin: 30px 20px 0 0;

      .graph_nav_text {
         border-radius: .3em;
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 20px;
      }

      .selectBox {
        +.selectBox {
          margin-top: 20px;
        }
      }
    }

    &__content {
       width: 700px;
       max-width: 700px;
    }
  }
</style>
