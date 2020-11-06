<template>
  <div class="container">
    <a-page-header class="header" title="FormModel表单" sub-title="v-model" />
    <a-card title="用户登录" class="login-card">
      <a-form-model :model="user" :rules="formRules" ref="form">
        <a-form-model-item label="用户名" prop="username">
          <a-input
            allowClear
            v-model.trim="user.username"
            @keyup.enter="$refs['password'].focus()"
          />
        </a-form-model-item>

        <a-form-model-item label="密码" prop="password">
          <a-input-password
            ref="password"
            allowClear
            v-model.trim="user.password"
            @keyup.enter="submit"
          />
        </a-form-model-item>

        <a-form-model-item :autoLink="false">
          <a-button
            block
            type="primary"
            @click="submit"
            :loading="loading"
            :disabled="disabled"
          >
            登录
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      user: {
        username: null,
        password: null,
      },
      formRules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "change",
          },
          {
            min: 4,
            max: 32,
            message: "账号只能4~32位字符",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change",
          },
          {
            min: 6,
            max: 32,
            message: "密码只能6~32位字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    disabled() {
      const { username, password } = this.user;
      return !username || !password;
    },
  },
  methods: {
    submit() {
      if (this.loading) {
        return;
      }
      this.loading = !this.loading;
      this.$refs["form"].validate((success) => {
        console.log("submit=========>", success);
        if (!success) {
          this.loading = false;
          return;
        }
        // TODO 调用接口
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.login-card {
  width: 400px;
  margin: auto;
}
</style>
