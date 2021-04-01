<template>
  <div>
    <van-nav-bar title="记录类型" right-text="按钮" fixed left-arrow @click-right="addNewCategory=true">
      <van-icon name="plus" slot="right" />
    </van-nav-bar>
    <br />
    <br />
    <van-tabs>
      <van-tab title="支出">
        <br />
        <br />
        <div v-for="(item,index) in expensesList" :key="index" style="margin-bottom:20px;">
          <van-row type="flex" justify="space-around" v-if="index%3==0">
            <van-col span="6">
              <van-button style="width:100%" :color="getColor(index)" v-if="expensesList[index]">
                <strong style="color:black">{{expensesList[index].categoryName}}</strong>
              </van-button>
            </van-col>
            <van-col span="6">
              <van-button
                style="width:100%"
                :color="getColor(index+1)"
                v-if="expensesList[index+1]"
              >
                <strong style="color:black">{{expensesList[index+1].categoryName}}</strong>
              </van-button>
            </van-col>
            <van-col span="6">
              <van-button
                style="width:100%"
                :color="getColor(index+2)"
                v-if="expensesList[index+2]"
              >
                <strong style="color:black">{{expensesList[index+2].categoryName}}</strong>
              </van-button>
            </van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="收入">
        <br />
        <br />
        <div v-for="(item,index) in incomesList" :key="index" style="margin-bottom:20px;">
          <van-row type="flex" justify="space-around" v-if="index%3==0">
            <van-col span="6">
              <van-button style="width:100%" :color="getColor(index)" v-if="incomesList[index]">
                <strong style="color:black">{{incomesList[index].categoryName}}</strong>
              </van-button>
            </van-col>
            <van-col span="6">
              <van-button style="width:100%" :color="getColor(index+1)" v-if="incomesList[index+1]">
                <strong style="color:black">{{incomesList[index+1].categoryName}}</strong>
              </van-button>
            </van-col>
            <van-col span="6">
              <van-button style="width:100%" :color="getColor(index+2)" v-if="incomesList[index+2]">
                <strong style="color:black">{{incomesList[index+2].categoryName}}</strong>
              </van-button>
            </van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
    <van-dialog
      v-model="addNewCategory"
      title="添加新的账目品类"
      show-cancel-button
      @confirm="addCategory"
      confirm-button-text="添加账目品类"
    >
      <br />
      <van-field label="账目品类名" v-model="categoryForm.categoryName" placeholder="请输入账目品类名" />
      <van-radio-group v-model="categoryForm.categoryType">
        <van-cell-group>
          <van-cell title="支出" clickable @click="radio = '支出'">
            <van-radio slot="right-icon" name="支出" />
          </van-cell>
          <van-cell title="收入" clickable @click="radio = '收入'">
            <van-radio slot="right-icon" name="收入" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <br />
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryForm: {
        categoryType: "支出",
        categoryName: ""
      },
      expensesList: [{ categoryId: 0, categoryType: "", categoryName: "" }],
      incomesList: [{ categoryId: 0, categoryType: "", categoryName: "" }],
      addNewCategory: false
    };
  },
  mounted() {
    this.getExpenses();
    this.getIncomes();
  },
  methods: {
    /**
     * 获取支出的记账品类
     */
    getExpenses() {
      this.$api.getExpenses().then(res => {
        this.expensesList = res.data;
      });
    },
    /**
     * 获取收入的记账品类
     */
    getIncomes() {
      this.$api.getIncomes().then(res => {
        this.incomesList = res.data;
      });
    },
    /**
     * 获取随机颜色
     * @param 标签下标
     * @return 颜色值
     */
    getColor(e) {
      switch (e % 10) {
        case 0:
          return "#ffd8bf";
        case 1:
          return "#eaff8f";
        case 2:
          return "#87e8de";
        case 3:
          return "#69c0ff";
        case 4:
          return "#d3adf7";
        case 5:
          return "#ff85c0";
        case 6:
          return "#fadb14";
        case 7:
          return "#d9d9d9";
        case 8:
          return "#52c41a";
        case 9:
          return "#cf1322";
      }
    },
    /**
     * 添加账目品类
     */
    addCategory() {
      this.$api.addCategory(this.categoryForm).then(res => {
        console.log(res.data);
        this.$notify({ type: "success", message: "添加成功" });
        this.getExpenses();
        this.getIncomes();
      });
    }
  }
};
</script>

<style>
</style>