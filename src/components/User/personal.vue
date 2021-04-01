<template>
  <div>
    <!-- 头部部分 -->
    <div class='personal_header'>
      <br>
      <br>
      <van-image round width="8rem" height="8rem" @click="tochange()" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <br>
      <br>
    </div>
    <!-- 登陆后消失，没登录时跳转到登陆界面 -->
    <van-cell title="登录/注册" v-if="token" to="/personal/login" is-link />
    <!-- 基本信息展示栏 -->
    <van-cell-group title='基本信息'>
      <van-cell title="真实姓名" :value="userInfo.realName" />
      <van-cell title="性别" :value='userInfo.gender' />

    </van-cell-group>
    <!-- 设置栏 -->
    <van-cell-group title="设置">

      <van-cell title="修改用户信息" v-if="!token" to="./personal/login/change" is-link />
      <van-cell title="退出登录" is-link @click="outlogin()" />
    </van-cell-group>

  </div>

</template>

<script>
import { log } from 'util'
export default {
  data () {
    return {
      token: true,
      userInfo: {
        gender: '',
        realName: ''
      }
    }
  },
  mounted () {
    //判断是否登录
    var token
    this.token = true
    //获取token，验证是否登录
    token = this.$cookie.get('token')
    //Boolean（token）为true表示
    if (Boolean(token)) { this.token = false }
    else
      return
    //获取用户登录用户信息并展示
    this.$api.getUser().then(res => {
      this.userInfo.gender = res.data.userGender
      this.userInfo.realName = res.data.userRealName
    })

  },
  methods: {
    outlogin () {
      this.$dialog.alert({
        //加上标题
        title: "退出登录",
        //改变弹出框的内容
        message: "确定要退出吗",
        //展示取消按钮
        showCancelButton: true
      })
        .then(() => {
          //点击确认按钮后的调用
          this.token = true
          //删除token
          this.$cookie.del('token')
          //清空数据
          this.userInfo = {
            gender: null,
            realName: null
          }
        })
        .catch(() => {
          //点击取消按钮后的调用
        })
    },
    tochange () {
      //跳转到用户信息改变界面
      this.$router.push('/personal/login/change')
    }
  }
}
</script>

<style scoped>
.personal_header {
  text-align: center;
  padding: 20px, auto;
}
</style>