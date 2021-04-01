<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar left-text="返回" left-arrow @click-left='topersonal()' />
    <br>
    <!-- 图标 -->
    <div class='personal_header'>
      <br>
      <van-image round width="8rem" height="8rem"
        src="http://is4-ssl.mzstatic.com/image/thumb/Purple128/v4/23/eb/97/23eb9703-2512-a1da-68d6-ca4d1f78b8bd/AppIcon-1x_U007emarketing-85-220-4.png/1024x1024bb.jpeg" />
    </div>
    <br>
    <br>
    <!-- 登录信息输入 -->
    <van-cell-group class="username">
      <van-field v-model="user.userName" label="用户名" clearable placeholder="请输入用户名" left-icon="contact" />

      <van-field v-model="user.userPassword" label="密码" type="password" clearable placeholder="请输入密码"
        left-icon="bag-o" />
    </van-cell-group>
    <br>
    <br>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="login()" size="large">登录</van-button>
    <br>
    <van-button to='/personal/login/register' size="large" plain>注册
    </van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        userName: '',
        userPassword: ''
      }
    }
  },
  methods: {
    topersonal () {
      this.$router.push('/personal')
    },
    login () {
      //用户名不能为空
      if (this.user.userName == '') {
        this.$toast("用户名不能为空");
        return false;
      }
      //密码不能为空
      if (this.user.userPassword == '') {
        this.$toast("密码不能为空");
        return false;
      }
      //请求登录
      this.$api.userLogin(this.user).then(res => {
        if (res.success == true) {
          //保存token到cookie里面
          this.$cookie.set('token', res.data.token, 120)
          //弹出登录成功信息
          this.$toast(res.message)
          //跳转到个人中心
          this.$router.push('/personal')
        }
      })
    }
  }

}
</script>

<style>
.username {
  margin: 0 auto;
}
.personal_header {
  text-align: center;
  padding: 20px, auto;
}
</style>