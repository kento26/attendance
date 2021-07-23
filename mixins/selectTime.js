import {
  mapState
} from 'vuex'

export default {
  data() {
    return {
      yearSelected: '',
      year: [],
      monthSelected: '',
      month: [],
    }
  },

  created() {
    const allTimeData = this.allTimeData

    // 1行目 年と月の重複のない配列を生成  (例 [2021, 2020]
    // 2行目 昇順に変換
    let yearData = [...new Set(allTimeData.map(({
      date
    }) => date.split('_')[1]))]
    yearData = yearData.sort((a, b) => a - b)

    let monthData = [...new Set(allTimeData.map(({
      date
    }) => date.split('_')[2]))]
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

  computed: {
    //storeから勤怠時間のデータを全て取得
    ...mapState({
      allTimeData: state => {
        const {
          userDoc
        } = state
        const reg = new RegExp('^time_', 'g');

        return userDoc ? Object.keys(userDoc).reduce((r, o) => {
          if (o.match(reg)) {
            userDoc[o].date = o
            userDoc[o].ID = o.split('_')[3]
            r.push(userDoc[o])
          }
          return r
        }, []) : []
      }
    }),

    //選択された日付のデータを返す
    getSelectDate() {
      return this.allTimeData.filter(({
        date
      }) => {
        const year = date.split('_')[1]
        const month = date.split('_')[2]
        return year === this.yearSelected && month === this.monthSelected
      }).sort((k, t) => k.ID - t.ID)
    }
  }
}
