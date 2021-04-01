<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="记录明细"
      right-text="按钮"
      fixed
      left-arrow
      @click-right="$router.push({path:'/category'})"
    >
      <div slot="right" style="color:blue">记录类型</div>
    </van-nav-bar>
    <!-- 日历层 -->
    <van-datetime-picker
      v-model="selectDate"
      :max-date="maxDate"
      :min-date="minDate"
      type="year-month"
      :formatter="formatter"
      :visible-item-count="3"
      @change="changeDate"
    />
    <van-divider />
    <div style="text-align:center">
      <van-row>
        <van-col span="12">
          <h2>总收入</h2>
          <strong
            style="font-family:'LESLIEB';color:#07c160;font-size:2rem"
          >{{monthBill.totalIncomes}}</strong>元
        </van-col>
        <van-col span="12">
          <h2>总支出</h2>
          <strong
            style="font-family:'LESLIEB';color:#ee0a24;font-size:2rem"
          >{{monthBill.totalExpenses}}</strong>元
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{borderColor:'#000'}" />
    <div v-for="(bill,index) in monthBill.dayBill" :key="index">
      <van-panel :title="'时间：'+format(bill.billTime,'yyyy-MM-dd')" :status="bill.billPrice+'元'"></van-panel>
      <van-divider :style="{borderColor:'#000'}" />
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxDate: new Date(),
      minDate: new Date(),
      selectDate: new Date(),
      monthBill: {
        month: "1970/01",
        dayBill: [{ billTime: "1970/01/01 00:00:00", billPrice: 0.0 }],
        totalPrice: 0.0,
        totalExpenses: 0.0,
        totalIncomes: 0.0
      }
    };
  },
  mounted() {
    this.$api.getFirstTime().then(res => {
      this.minDate = new Date(res.data);
    });
    this.getBillListByMonth(new Date());
  },
  methods: {
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    /**
     * 修改时间触发函数
     */
    changeDate(date) {
      this.getBillListByMonth(date);
    },
    /**
     * 格式化日期
     * @param date 要格式化的日期
     * @param fmt 格式化成的格式
     * @return 格式化后的日期
     */
    format(date, fmt) {
      return this.$date.format(date, fmt);
    },
    /**
     * 获取某月的总账单
     * @param date 某月
     */
    getBillListByMonth(date) {
      date = this.format(date, "yyyy/MM/dd");
      this.$api
        .getBillListByMonth(date)
        .then(res => {
          this.monthBill = res.data;
        })
        .catch(res => {
          this.monthBill = null;
        });
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "LESLIEB";
  src: url(../../../assets/LESLIEB_.ddcefc56.TTF);
}
</style>