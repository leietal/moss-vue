<template>
  <div class="login-container">
    <div class="seation login-body">
      <div class="login-box">
        <div class="login-left">
          <object :data="loginImg" width="200" type="image/svg+xml">图片未能正常显示</object>
        </div>

        <div class="login-right">
          <a-form layout="vertical" :form="form">
            <a-row>
              <a-col :span="24">
                <h3 class="login-title">后台登录</h3>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-item>
                  <a-input
                    placeholder="账号"
                    v-decorator="formDecorator.username"
                    @keyup.enter="$refs['password'].focus()"
                  >
                    <a-icon slot="prefix" type="user" />
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-item>
                  <a-input-password
                    placeholder="密码"
                    v-decorator="formDecorator.password"
                    ref="password"
                    @keyup.enter="submit"
                  >
                    <a-icon slot="prefix" type="lock" />
                  </a-input-password>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-button
                  type="primary"
                  @click="submit"
                  block
                  :loading="loading"
                >{{loading?'正在登录':'登录'}}</a-button>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
    </div>

    <div class="login-footer">
      <div class="section">
        <div>版权所有：www.leijiaping.com</div>
        <div>
          沪ICP备
          <a href="#" target="_blank">8888888</a>
          号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      loading: false,
      loginImg: require("@/assets/login.svg"),
      formDecorator: {
        username: [
          "username",
          {
            rules: [{ required: true, message: "账号不能为空" }],
          },
        ],
        password: [
          "password",
          {
            rules: [{ required: true, message: "密码不能为空" }],
          },
        ],
      },
    };
  },
  methods: {
    login() {
      return new Promise();
    },
    submit() {
      this.form.validateFields((errors, values) => {
        if (errors) {
          return;
        }
        this.loading = true;
        // 提交数据
        this.login()
          .then(() => {
            const { redirect } = this.$route.query || {};
            this.$router.push(redirect || "/");
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  min-width: 1000px;
  min-height: 400px;
  background-color: #f9f9f9;
}
.section {
  max-width: 1600px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0 20px;
  box-sizing: border-box;
}
.login-body {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-content: center;
}
.login-box {
  display: grid;
  grid-auto-flow: column;
  align-content: stretch;
  border: 1px solid #dce0ff;
  border-radius: 2px;
  overflow: hidden;
}
.login-left {
  padding: 20px 60px;
  box-sizing: border-box;
  background-color: #f5f6fd;
  display: grid;
  justify-content: center;
  align-content: center;
}
.login-right {
  padding: 40px;
  box-sizing: border-box;
  width: 360px;
  background-color: #fff;
}

.login-box .login-title {
  font-size: 28px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 30px;
}

.login-box button {
  height: 48px;
  line-height: 48px;
  padding: 0;
}

.login-footer {
  display: flex;
  justify-items: center;
}
.login-footer .section {
  text-align: center;
  color: #666;
  font-size: 12px;
  font-weight: 300;
  padding: 10px 20px;
}
.login-footer a {
  color: #666;
}
.login-footer a:hover {
  color: #6c63ff;
}
</style>

<style >
.login-box .ant-form-item-control,
.login-box .ant-input-affix-wrapper,
.login-box .ant-input {
  height: 48px;
}
.login-box .ant-input-affix-wrapper .anticon {
  font-size: 16px;
}
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 36px;
}
</style>