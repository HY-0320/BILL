<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar left-text="返回" left-arrow @click-left='tologin()' />
    <div class='personal_header'>

      <br>
      <!-- 图标 -->
      <van-image round width="8rem" height="8rem"
        src="http://is4-ssl.mzstatic.com/image/thumb/Purple128/v4/23/eb/97/23eb9703-2512-a1da-68d6-ca4d1f78b8bd/AppIcon-1x_U007emarketing-85-220-4.png/1024x1024bb.jpeg" />
    </div>
    <br>
    <br>
    <!-- 注册信息输入 -->
    <van-field v-model="userInfo.username" label="用户名" clearable required placeholder="请输入用户名" right-icon="question-o"
      @click-right-icon="$toast('用户名必须是6-20位数字、字母以及下划线')" />
    <van-field readonly clickable required label="性别" :value="value" placeholder="选择性别" @click="showPicker = true" />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
    <van-field v-model="userInfo.password" label="密码" type="password" clearable required placeholder="请输入密码"
      right-icon="question-o" @click-right-icon="$toast('密码必须是6-20位字母、数字以及下划线')" />
    <van-field v-model="userInfo.repassword" type="password" label="再次输入" placeholder="再次输入密码" clearable required
      right-icon="question-o" @click-right-icon="$toast('必须和第一次输入的密码相同')" />
    <van-field v-model="userInfo.realname" label="真实姓名" placeholder="请输入真实姓名" clearable required right-icon="question-o"
      @click-right-icon="$toast('必须是真实姓名')" />
    <br>
    <br>
    <van-button class="login_button" color="linear-gradient(to right, #4bb0ff, #6149f6)" size="large"
      @click="register()">注册
    </van-button>
  </div>
</template>

<script>
import { userInfo } from 'os';
export default {
  data () {
    return {
      value: '',
      index: '',
      showPicker: false,
      columns: ['男', '女'],
      userInfo: {
        username: '',
        password: '',
        repassword: '',
        gender: '',
        realname: ''

      },
      from: {
        userName: '',
        userPassword: '',
        userRealName: '',
        userGender: ''
      }
    }
  },
  methods: {
    // 跳转到登录界面
    tologin () {
      this.$router.push('/personal/login')
    },
    //确定选择性别
    onConfirm (value, index) {
      //value为Colums的值，index为索引值，男为0，女为1
      this.index = index;
      this.$set(this.userInfo, 'gender', this.index);
      this.value = value;
      this.showPicker = false;
    },
    //注册功能
    register () {
      //规定性别男为true
      //性别女为false
      if (this.userInfo.gender == 0) {
        this.$set(this.from, 'userGender', true)
      }
      else
        this.$set(this.from, 'userGender', false)
      //完善提交表 
      this.from.userName = this.userInfo.username
      this.from.userPassword = this.userInfo.password
      this.from.userRealName = this.userInfo.realname
      //用户名不能为空
      if (this.userInfo.username == '') {
        this.$toast("用户名不能为空");
        return false;
      }
      //密码不能为空
      if (this.userInfo.password == '') {
        this.$toast("密码不能为空");
        return false;
      }
      //再次输入的密码不能为空
      if (this.userInfo.repassword == '') {
        this.$toast("请再次输入密码");
        return false;
      }
      //真实姓名不能为空
      if (this.userInfo.realname == '') {
        this.$toast("真实姓名不能为空");
        return false;
      }
      else {
        //注册请求
        this.$api.userRegister(this.from).then(res => {
          if (res.data == true) {
            this.$toast(res.message)
            this.$router.push('/personal/login')
          }
          // else {
          //   this.userInfo = {
          //     username: null,
          //     password: null,
          //     repassword: null,
          //     gender: null,
          //     realname: null            }
          //   this.$toast('注册失败')

          // }

        }

        )
      }
    }
  }
}


</script>

<style>
</style>