<template>
  <div class="login-container">
    <!-- 卡片 -->
    <el-card class="login_box">
      <img src="../../assets/images/logo_index.png" alt="背景" />
      <!-- 表单 -->
      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules"  >
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float: right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      // 逻辑校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不对'))
      }
    }
    return {
      // 表单对应的对象
      loginForm: {
        mobild: '',
        code: ''
      },
      // 表单校验验证规则
      loginRules: {
        mobile: [
          // 具体的校验规则,比如 是否必填 长度, 格式...
          { required: true, message: '请输入您的手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '是6位哦!请检查您输入的验证码.', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login () {
      // 表单整体的校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 如果校验成功, 进行登录
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // res是响应对象, 包含响应数据
              const data = res.data
              // 后台的返回的json内容已被转换成了对象
              console.log(data)
              // 思考: 登录成功之后,要做什么事
              // 1.跳转到首页
              // 2.保存登录状态
              this.$router.push('/')
            })
            .catch(() => {
              // 提示错误 使用组件 消息提示组件
              this.$message.error('验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto 30px;
    }
  }
}
.el-checkbox {
  margin-right: 5px;
}
</style>
