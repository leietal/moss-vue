<template>
  <div class="container">
    <a-card title="用户登录" class="login-card">
      <a-form :form="form">
        <a-form-item label="用户名">
          <a-input
            allowClear
            v-decorator="formRules.username"
            @keyup.enter="$refs['password'].focus()"
          />
        </a-form-item>

        <a-form-item label="密码">
          <a-input-password
            ref="password"
            allowClear
            v-decorator="formRules.password"
            @keyup.enter="submit"
          />
        </a-form-item>

        <a-form-item label="日期">
          <xs-range-picker
            beginDate="beginDate2"
            endDate="endDate2"
            :form="form"
            v-decorator="['date2']"
          />
        </a-form-item>

        <a-form-item label="日期">
          <xs-range-picker :form="form" v-decorator="['date3']" />
        </a-form-item>

        <a-form-item>
          <a-button block type="primary" @click="submit" :loading="loading">
            保存
          </a-button>
          <a-button block type="default" @click="reset"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  components: {},
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      params: {},
      loading: false,
      defaultValue: null,
      formRules: {
        username: [
          "username",
          {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "用户名不能为空",
              },
              {
                min: 4,
                max: 20,
                message: "只能输入4~20长度的字符",
              },
            ],
            normalize: (val) => {
              return val && val.trim();
            },
            trigger: "change",
          },
        ],
        password: [
          "password",
          {
            rules: [
              {
                required: true,
                message: "密码不能为空",
              },
              {
                min: 4,
                max: 20,
                message: "只能输入4~20长度的字符",
              },
            ],
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.form.resetFields();
      this.initForm();
    },
    test(id) {
      this.$router.push({ path: "/test", query: { id } });
    },
    submit() {
      if (this.loading) {
        return;
      }
      this.loading = !this.loading;
      this.form.validateFields((errors, values) => {
        console.log("submit==========>", values);
        if (!errors) {
          this.loading = false;
          return;
        }
        // FIXME 提交表单数据
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      });
    },
    initForm(params) {
      if (params) {
        this.params = params;
      } else {
        params = this.params || {};
      }
      // 注册
      const fields = this.form.getFieldsValue();
      for (var key in params) {
        if (!fields.hasOwnProperty(key)) {
          this.form.getFieldDecorator(key, { preserve: true });
        }
      }
      // 初始化赋值
      this.form.setFieldsValue({ ...params });
    },
  },
  created() {
    this.initForm({
      beginDate: null,
      endDate: null,
    });
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
}
.login-card {
  width: 400px;
  margin: auto;
}
</style>
