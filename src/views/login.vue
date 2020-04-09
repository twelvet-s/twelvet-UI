<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <!-- 标题 -->
      <h3 class="title">TwelveT后台登录</h3>

      <!-- 用户名称 porp表单验证-->
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          placeholder="账号"
          clearable
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
          show-password
          clearable
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>

      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

    <!--  底部  -->
    <div class="login-footer">
      <span>Copyright © 2020 twelvet.cn All Rights Reserved.</span>
    </div>
  </div>
</template>


<script>
// cookie组件
import Cookies from "js-cookie";

export default {
  name: "Login",
  data() {
    return {
      //  表单数据
      loginForm: {
        username: "admin",
        password: 123456,
        rememberMe: false
      },
      // 验证规则
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }]
      },
      // 登录状态
      loading: false
    };
  },
  // 初始化成功后执行函数
  mounted() {
    
  },
  methods: {
    // 点击登录按钮
    handleLogin() {
      // 判断是否验证表单认证成功
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 更改登录按钮状态
          this.loading = true;
          // 是否需要使用cookie记住账号密码
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", this.loginForm.password, { expires: 30 });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }

          // 调用全局登录方法执行登录
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              // 登录成功跳转
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              // 恢复登录状态
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 25px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 5px;
  background: #ffffff;
  width: 350px;
  padding: 25px 25px 5px 25px;
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>