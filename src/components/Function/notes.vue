<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="首页" right-text="按钮" fixed left-arrow @click-right="addNewBillDialog=true">
      <van-icon name="plus" slot="right" />
    </van-nav-bar>
    <!-- 日历控件 -->
    <van-calendar
      title=" "
      :poppable="false"
      :show-confirm="false"
      :min-date="calMinDate"
      :max-date="calMaxDate"
      :style="{ height: '420px' }"
      @select="changeDate"
    />
    <van-divider />
    <div class="bill-list">
      <div v-if="billList==null" style="text-align:center;color:#969799">
        <br />
        <p>(￣▽￣)~*</p>
        <p>这里什么都没有</p>
        <p>快来添加一条记录吧</p>
      </div>
      <div v-for="bill in billList" :key="bill.billId">
        <van-panel
          :title="bill.category.categoryName"
          :desc="bill.billRemark?bill.billRemark:'还没有备注哦'"
          :status="+bill.category.categoryType==='支出'?'-':''+bill.billPrice+'元'"
        >
          <van-cell :title="'记录时间'">
            <strong>{{bill.billTime}}</strong>
          </van-cell>
          <div slot="footer" style="text-align:end">
            <van-button size="small">修改</van-button>&nbsp;&nbsp;
            <van-button size="small" type="danger" @click="openDeleteDialog(bill.billId)">删除</van-button>
          </div>
        </van-panel>
        <van-divider :style="{borderColor:'#000'}" />
      </div>
    </div>
    <!-- 右下角固定一个按钮来添加记账记录 -->
    <div class="add-bill-btn">
      <van-button
        @click="addNewBillDialog=true"
        type="primary"
        block
        round
        style="height:100%;"
        icon="plus"
        loading-size="40px"
      ></van-button>
    </div>
    <van-popup v-model="addNewBillDialog" position="bottom" :style="{ height: '80%' }" closeable>
      <van-panel title="添加一条记录" desc="您可以选择添加一条收入/支出记录">
        <van-cell :title="'收入金额（单位：元）'" label="您可以通过点击数字来修改金额">
          <van-field
            v-model="billForm.billPrice"
            readonly
            placeholder="点此输入"
            type="number"
            input-align="right"
            @touchstart.native.stop="numberKey = true"
            clickable
          />
        </van-cell>
        <van-cell :title="'记录类型'" :label="'通过点击右侧标签更改类型'">
          <van-dropdown-menu direction="up">
            <van-dropdown-item
              v-model="categoryType"
              :options="categoryTypeList"
              @change="changeType"
            />
            <van-dropdown-item v-model="billForm.category" :options="expensesList" />
          </van-dropdown-menu>
        </van-cell>
        <van-cell :title="'记录时间'" label="您可以通过点击时间来修改时间">
          <strong @click="selectTime=true">{{format(billForm.billTime,"yyyy-MM-dd hh:mm")}}</strong>
        </van-cell>
        <van-cell-group>
          <van-field
            v-model="billForm.billRemark"
            rows="1"
            autosize
            label="备注"
            type="textarea"
            placeholder="您可以在这里输入此条记录的备注"
            maxlength="50"
            show-word-limit
          />
        </van-cell-group>
        <br />
        <van-button type="primary" size="large" @click="addNewBill">添加记录</van-button>
      </van-panel>
    </van-popup>
    <!-- 数字键盘 -->
    <van-number-keyboard
      close-button-text="完成"
      v-model="billForm.billPrice"
      extra-key="."
      :show="numberKey"
      @blur="numberKey = false"
      :z-index="2147483647"
    />
    <!-- 时间选择器 -->
    <van-popup v-model="selectTime" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="billForm.billTime"
        @confirm="selectTime=false"
        :max-date="maxDate"
        cancel-button-text=" "
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      billForm: {
        billTime: new Date(),
        billPrice: "",
        billRemark: "",
        category: 0
      },
      maxDate: null,
      addNewBillDialog: false,
      numberKey: false,
      categorySelect: false,
      categoryType: 1,
      expensesList: [],
      incomesList: [],
      categoryTypeList: [
        { text: "支出", value: 1 },
        { text: "收入", value: 0 }
      ],
      selectTime: false,
      calMaxDate: new Date(),
      calMinDate: new Date(new Date().getTime() - 1111),
      billList: [
        {
          billId: 0,
          billTime: "2020/01/09 20:47:19",
          billPrice: 0.0,
          billRemark: null,
          category: {
            categoryType: "",
            categoryName: ""
          }
        }
      ],
      selectDate: null
    };
  },
  mounted() {
    this.getExpenses();
    this.getIncomes();
    this.maxDate = new Date();
    this.getAllBill();
    this.getAllBillByDay(new Date());
  },
  methods: {
    /**
     * 获取今日全部账单明细
     */
    getBillByDay() {},
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
     * 获取支出的记账品类
     */
    getExpenses() {
      this.$api.getExpenses().then(res => {
        var temp = res.data;
        var result = [
          {
            text: "",
            value: 0
          }
        ];
        this.$set(this.billForm, "category", res.data[0].categoryId);
        for (var i = 0; i < temp.length; i++) {
          result[i] = {
            text: "",
            value: 0
          };
          result[i].text = temp[i].categoryName;
          result[i].value = temp[i].categoryId;
          this.expensesList.push(result[i]);
        }
      });
    },
    /**
     * 获取收入的记账品类
     */
    getIncomes() {
      this.$api.getIncomes().then(res => {
        var temp = res.data;
        var result = [
          {
            text: "",
            value: 0
          }
        ];
        for (var i = 0; i < temp.length; i++) {
          result[i] = {
            text: "",
            value: 0
          };
          result[i].text = temp[i].categoryName;
          result[i].value = temp[i].categoryId;
          this.incomesList.push(result[i]);
        }
      });
    },
    /**
     * 改变记录类型的触发函数
     */
    changeType(value) {
      if (value == 0) {
        var temp = this.expensesList;
        this.expensesList = this.incomesList;
        this.incomesList = temp;
      } else {
        var temp = this.incomesList;
        this.incomesList = this.expensesList;
        this.expensesList = temp;
      }
      this.$set(this.billForm, "category", this.expensesList[0].value);
    },
    /**
     * 添加记录
     */
    addNewBill() {
      if (!this.billForm.billRemark) {
        this.$set(this.billForm, "billRemark", null);
      }
      var dateTemp=this.format(new Date(this.billForm.billTime), "yyyy/MM/dd hh:mm:ss")
      this.$set(this.billForm,"billTime",dateTemp)
      var billForm={
        billTime: dateTemp,
        billPrice: this.billForm.billPrice,
        billRemark: this.billForm.billRemark,
        category: this.billForm.category
      }
      this.$api.notes(billForm).then(res => {
        this.$notify({ type: "success", message: "添加成功" });
        this.addNewBillDialog = false;
        this.getAllBillByDay(this.selectDate);
      });
    },
    /**
     * 获取全部记账
     */
    getAllBill() {
      this.$api.getAll().then(res => {
        this.calMinDate = new Date(res.data[res.data.length - 1].billTime);
      });
    },
    /**
     * 获取用户某天的记账
     * @param time 时间
     */
    getAllBillByDay(time) {
      this.selectDate = time;
      time = this.format(time, "yyyy/MM/dd");
      this.$api
        .getAllBillByDay(time)
        .then(res => {
          this.billList = res.data;
        })
        .catch(res => {
          this.billList = null;
        });
    },
    /**
     * 切换日历日期触发函数
     */
    changeDate(e) {
      this.getAllBillByDay(new Date(e));
    },
    /**
     * 打开确认删除弹框
     */
    openDeleteDialog(e) {
      this.$dialog
        .confirm({
          title: "确认删除",
          message:
            "您即将删除一条记录，该记录删除后无法恢复，请再三确认是否删除？",
          confirmButtonText: "我意已决",
          confirmButtonColor: "#ee0a24",
          cancelButtonText: "我再想想"
        })
        .then(() => {
          // on confirm
          this.$api.deleteBill(e).then(res => {
            this.getAllBillByDay(this.selectDate);
            this.$notify({ type: "success", message: "删除成功" });
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style scoped>
.add-bill-btn {
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 50px;
  height: 50px;
}
.bill-list {
  margin-bottom: 120px;
}
</style>