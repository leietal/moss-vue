<template>
  <a-modal title="测试" :visible="visible" @cancel="cancel" @ok="ok" :footer="null" :width="360">
    <a-form :form="form">
      <a-form-item label="姓名">
        <a-input v-decorator="formObj.username" allowClear />
      </a-form-item>
      <a-form-item label="是否为人">
        <a-switch v-decorator="formObj.person" />
      </a-form-item>
      <a-form-item>
        <a-button block type="primary" @click="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  created() {
    this.form = this.$form.createForm(this);
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      formObj: {
        username: [
          "username",
          {
            initialValue: "leijiaping",
            rules: [
              { required: true, message: "姓名不能为空" },
              { min: 6, message: "6" },
              { max: 20, message: "20" },
              { whitespace: true, message: "不能为空格" },
            ],
          },
        ],
        person: [
          "person",
          {
            rules: [],
            valuePropName: "checked",
            initialValue: true,
          },
        ],
      },
    };
  },
  watch: {
    visible(val) {
      if (val) {
        let obj = this.form.getFieldsValue();
        for (let key in obj) {
          obj[key] = this.data[key];
        }
        this.form.setFieldsValue(obj);
      }
    },
  },
  methods: {
    cancel() {
      console.log("内部发起：cancel1");
      this.$emit("cancel");
    },
    ok() {
      console.log("内部发起：ok1");
      this.$emit("ok");
    },
    submit() {
      this.form.validateFields((errors, values) => {
        if (errors) {
          return;
        }
        Object.assign(this.data, values);
        this.$emit("ok", {});
        console.log("----------%o", this.data);
      });
    },
  },
};
</script>

<style scoped>
.xs-login-container {
  width: 100%;
  height: 100%;
  background: url("https://testjs.newyetai.com/img/login-bg.6f9c293f.jpg")
    center no-repeat;
  display: grid;
  grid-template-rows: 60px 1fr auto;
  min-width: 680px;
  min-height: 420px;
}
.xs-section {
  max-width: 1600px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0 20px;
  box-sizing: border-box;
}
.xs-login-header {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.xs-login-header .xs-section {
  display: grid;
  align-content: center;
}
.xs-login-header .xs-logo-title {
  font-size: 24px;
  font-weight: 400;
  color: #6432d1;
}
.xs-login-body {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 40% auto;
  justify-items: center;
  align-items: center;
}
.xs-right {
  height: 100%;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
}
.xs-login-box {
  width: 400px;
  padding: 40px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.7);
}
.xs-login-box .ant-form-item {
  margin-bottom: 20px !important;
}
.xs-login-box button {
  height: 40px;
  line-height: 40px;
  padding: 0;
}
.xs-login-box .xs-login-title {
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}
.xs-login-footer {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-items: center;
}
.xs-login-footer .xs-section {
  text-align: center;
  color: #fff;
  font-size: 12px;
  font-weight: 300;
  padding: 10px 20px;
}
.xs-login-footer a {
  color: #fff;
}
.xs-login-footer a:hover {
  color: #d3316c;
}
</style>

<style >
.xs-login-box .ant-input-affix-wrapper,
.xs-login-box .ant-input {
  height: 40px !important;
}
</style>