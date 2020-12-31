<template>
  <div class="xs-container login-container" :style="bgStyle">
    <div class="login-main">
      <div class="login-box">
        <div class="box-header">
          <h3 class="header-title">CMS管理后台</h3>
        </div>
        <div class="box-content">
          <a-form-model
            ref="userForm"
            :model="user"
            :rules="userRules"
            layout="vertical"
          >
            <a-form-model-item has-feedback label="" prop="username">
              <a-input
                v-model="user.username"
                ref="username"
                allowClear
                @keypress.enter="next('password')"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-model-item>

            <a-form-model-item has-feedback label="" prop="password">
              <a-input
                v-model="user.password"
                type="password"
                ref="password"
                allowClear
                @keypress.enter="submit"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-model-item>

            <a-form-model-item class="xs-form-action">
              <a-button
                block
                type="primary"
                @click="submit"
                :loading="loading"
                :disabled="submitDisabled"
                >{{ loading ? "登录中..." : "登录" }}</a-button
              >
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </div>

    <div class="login-footer">
      <span>版权所有：鑫善信息科技（上海）有限公司</span>
      <span>
        沪ICP备
        <a href="#" target="_blank">19032502</a>
        号
      </span>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/home";

export default {
  created() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      loading: false,
      user: {
        username: null,
        password: null,
      },
      userRules: {
        username: [
          { required: true, message: "账号不能为空", whitespace: true },
          { min: 4, message: "账号不能少于4位", whitespace: true },
          { max: 32, message: "账号不能大于32位", whitespace: true },
        ],
        password: [
          { required: true, message: "密码不能为空", whitespace: true },
          { min: 6, message: "密码不能少于6位", whitespace: true },
          { max: 32, message: "密码不能大于32位", whitespace: true },
        ],
      },
    };
  },
  computed: {
    bgStyle() {
      const url = require("@/assets/bg.png");
      return {
        backgroundImage: `url(${url})`,
      };
    },
    submitDisabled() {
      const { username, password } = this.user;
      return !username || !password;
    },
  },
  methods: {
    next(refName) {
      this.$refs[refName].focus();
    },
    submit() {
      this.loading = true;
      this.$refs["userForm"]
        .validate()
        .then(() => {
          return login(this.user);
        })
        .then((res) => {
          // 重定向原页面
          const { redirect } = this.$route.query || {};
          this.$router.push(redirect || "/");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.$refs["username"].focus();
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 0;
  background-color: #f1f1f1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.login-main {
  display: flex;
}
.login-box {
  width: 400px;
  border-radius: 2px;
  background-color: #fff;
  margin: auto;
  overflow: hidden;
  box-shadow: 0 1px 4px 1px #e7e7e7;
}
.login-box .box-header {
  padding: 30px 10px;
  text-align: center;
}
.login-box .box-content {
  height: 240px;
  padding: 0 50px;
  box-sizing: border-box;
}
.login-box .header-title {
  font-size: 24px;
  font-weight: 300;
  color: #333;
}
.login-box .box-form-action {
  margin-top: 10px;
}
.login-box .ant-form-item {
  margin-bottom: 0 !important;
}
.login-box .anticon {
  color: #999;
}
.login-box .ant-btn {
  height: 40px;
  line-height: 40px;
  padding: 0;
  border: none;
}
.login-footer {
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 300;
  color: #fff;
  background: #282828;
  display: grid;
  gap: 20px;
  grid-auto-flow: column;
  justify-content: center;
}
.login-footer a {
  color: #fff;
}
.login-footer a:hover {
  color: #546de5;
}
</style>

<style>
.login-box .ant-input-affix-wrapper,
.login-box .ant-input {
  height: 40px !important;
}
.login-box .ant-form-item-control {
  height: 70px;
}
</style>