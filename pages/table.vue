<template>
  <div class="chart">
    <div class="chart__head">
      <p class="chart_head_text">日付を選択</p>

      <div class="chart_head_select">
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
    </div>

    <div class="chart__content">
       <div class="chart_content_list" v-if="getSelectDate.length">
         <div class="chart_content_list__head">
           <ul>
             <li>日</li>
             <li>出勤</li>
             <li>休憩 開始</li>
             <li>休憩 終了</li>
             <li>退勤</li>
           </ul>
         </div>

          <div class="chart_content_list__item">
            <ul>
              <li :class="{ isOdd: index % 2 === 0 }" v-for="(item, index) in getSelectDate" :key="item.date">
                <p>{{ item.date | conversionDate }}</p>
                <p>{{ item.workStart }}</p>
                <p>{{ item.breakStart }}</p>
                <p>{{ item.breakEnd }}</p>
                <p>{{ item.workEnd }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="noDataText">データがありません。</p>
        </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    layout: 'user',

    created() {
      const allTimeData = this.allTimeData

      // 1行目 年と月の重複のない配列を生成  (例 [2021, 2020]
      // 2行目 昇順に変換
      let yearData = [...new Set(allTimeData.map(({ date }) => date.split('_')[1]))]
          yearData = yearData.sort((a, b) => a - b)

      let monthData = [...new Set(allTimeData.map(({ date }) => date.split('_')[2]))]
          monthData = monthData.sort((a, b) => a - b)

      //selectBoxのデータを設定
      this.year = yearData.map(y => ({
        label: `${y}年`,
        value: y
      }))

      this.month = monthData.map(m => ({
        label: `${m}月`,
        value: m
      }))

      //selectBoxの初期値を設定
      const newDate = new Date();
      this.yearSelected = String(newDate.getFullYear())
      this.monthSelected = String((Number(newDate.getMonth()) + 1))
    },

    data () {
      return {
        yearSelected: '',
        year: [],
        monthSelected: '',
        month: [],
      }
    },

    computed: {

      //storeから勤怠時間のデータを全て取得
      ...mapState({
        allTimeData: state => {
          const { userDoc } = state
          const reg = new RegExp('^time_','g');

          return userDoc ? Object.keys(userDoc).reduce((r, o) => {
            if(o.match(reg)) {
              userDoc[o].date = o
              r.push(userDoc[o])
            }
            return r
          }, []) : []
        }
      }),

      //選択された日付のデータを返す
      getSelectDate() {
        return this.allTimeData.filter(({ date }) => {
          const year = date.split('_')[1]
          const month = date.split('_')[2]
          return year === this.yearSelected && month === this.monthSelected
        })
      }
    },

    filters: {
      conversionDate(date) {
        return `${date.split('_')[2]}/${date.split('_')[3]}`
      }
    },
  }
</script>

<style lang="scss" scoped>
  .chart {
    &__head {
      margin-bottom: 60px;

      .chart_head_text {
         border-radius: .3em;
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 20px;
      }

      .chart_head_select {
         display: flex;

         .selectBox {
           +.selectBox {
             margin-left: 20px;
           }
         }
      }
    }

    &__content {
      .chart_content_list {
        &__head {
          margin-bottom: 30px;

          ul {
            display: flex;

            li {
              width: 150px;
              text-align: center;
              font-size: 18px;
              letter-spacing: .03em;
              font-weight: 600;
            }
          }
        }

        &__item {
          ul {
            li {
              display: flex;
              text-align: center;
              font-size: 16px;
              letter-spacing: .03em;
              padding: 10px 0;

              &.isOdd {
                background-color: #e7effa;
              }

              +li {
                margin-top: 5px;
              }

              p {
                width: 150px;
              }
            }
          }
        }
      }

      .noDataText {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: .03em;
        text-align: center;
      }
    }
  }
</style>
