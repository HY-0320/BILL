<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="图表展示" left-arrow>
    </van-nav-bar>
    <br>
    <!--月账单展示区-->
    <van-cell title="月账单" :value="monthvalue" is-link @click="showPicker=true" />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="confirmmonth" @cancel='cancel' />
    </van-popup>
    <ve-line :data="chartData1" :legend-visible="false"></ve-line>
    <!--日账单展示区-->
    <van-cell title="日账单" :value="date" is-link @click="showdate = true" />
    <van-calendar v-model="showdate" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate" />
    <ve-pie :data="chartData2"></ve-pie>

  </div>
</template>

<script>
//月份选择器的定义
const months = {
  '2020': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  '2019': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  '2018': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
};
export default {

  data () {
    this.chartSettings = {
      xAxisType: 'time'    }
    return {
      columns: [
        {
          values: Object.keys(months),
          className: 'column1'
        },
        {
          values: months['2020'],
          className: 'column2',
          defaultIndex: 2
        }
      ],
      monthvalue: '选择月份',
      date: '选择具体日期',
      showPicker: false,
      showdate: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2020, 11, 31),
      checked: false,
      chartData1: {
        columns: ['date', 'money'],
        rows: [
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 },
          { 'date': '', 'money': 0 }
        ]
      },
      chartData2: {
        columns: ['type', 'money'],
        rows: [
          { 'type': '支出', 'money': 0 },
          { 'type': '收入', 'money': 0 },
        ]
      }
    }
  },
  methods: {
    /**
     * 选择具体日期后，渲染饼图
     */
    onConfirm (date) {
      // 分别定义收入和支出
      var outsum = 0
      var insum = 0
      this.showdate = false;
      //日期格式化
      this.date = this.$date.format(date, "yyyy/MM/dd");
      //获取具体某天账单
      this.$api.getAllBillByDay(this.date).then(res => {
        //渲染饼图的数据
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].billPrice >= 0) { insum = insum + res.data[i].billPrice }
          else { outsum = outsum + res.data[i].billPrice }
        }
        this.chartData2.rows[0].money = Math.abs(outsum)
        this.chartData2.rows[1].money = insum
      })
    },
    /**
     *查看某月的账单 
     **/
    confirmmonth (value) {
      this.showPicker = false
      //格式化日期
      var year = value[0]
      var month = value[1]
      this.monthvalue = year + '/' + month
      var date = year + '/' + month + '/' + 31
      //请求查看账单
      this.$api.getBillListByMonth(date).then(res => {
        console.log(res.data.dayBill[0].billTime)
        //渲染折线图的数据
        for (var i = 0; i < res.data.dayBill.length; i++) {
          this.chartData1.rows[i].date = res.data.dayBill[i].billTime
          this.chartData1.rows[i].money = res.data.dayBill[i].billPrice
        }
      })
    },
    /**
     *取消按钮 
     ***/
    cancel () {
      this.showPicker = false
    },
    onSelect (item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;

    }
  }
}

</script>

<style>
</style>