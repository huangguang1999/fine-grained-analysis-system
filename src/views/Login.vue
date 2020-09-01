<template>
    <div class="login-wrap">
        <div class="ms-login">
            <img src="../../static/logo.png" class="ms-img"/>
            <div class="ms-title">城市群体时空行为模式挖掘系统&nbsp;&nbsp;&nbsp;</div>
            <el-form :model="param" :rules="rules" ref="loginInput" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="loginIn(param.username, param.password)">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import {login} from '../api/user'
export default {
  data: function () {
    return {
      param: {
        username: 'admin@163.com',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {
      const that = this
      // this.$refs.loginInput.validate(valid => {
      //   console.log('========')
      //   console.log(that.loginIn(this.param.username, this.param.password))
      //   if (valid && that.loginIn(this.param.username, this.param.password)) {
      //     this.$message.success('登录成功')
      //     this.$router.push('/3DheatMap')
      //   } else {
      //     this.$message.error('请输入账号和密码')
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      console.log(this.loginIn(this.param.username, this.param.password))
      if (this.loginIn(this.param.username, this.param.password)) {
        this.$router.push('/3DheatMap')
      }
    },
    // 鉴权
    loginIn (username, password) {
      const params = {
        email: username,
        password: password
      }
      login(params).then((res) => {
        if (res.success) {
          localStorage.setItem('token', res.data.data.token)
          this.$router.push('/3DheatMap')
          return true
        } else {
          console.log(res.msg)
          return false
        }
      }).catch(err => {
        throw err
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
    background-color: #33baff;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(245, 245, 245, 0.5);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.ms-img {
  width: 50px;
  height: 50px;
  float: left;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
