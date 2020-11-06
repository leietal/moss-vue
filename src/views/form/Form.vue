<template>
  <div class="container">
    <a-page-header class="header" title="Form表单" sub-title="v-decorator" />

    <div style="width: 400px">
      <a-form :form="form">
        <a-form-item label="出发地">
          <a-input
            allowClear
            v-decorator="formRules.departure"
            @keyup.enter="$refs['destination'].focus()"
          />
        </a-form-item>

        <a-form-item label="到达地">
          <a-input
            ref="destination"
            allowClear
            v-decorator="formRules.destination"
          />
        </a-form-item>

        <a-form-item label="往返日期">
          <ms-range-picker :form="form" v-decorator="['returnDate']" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="query">查询</a-button>
          <a-button type="default" @click="reset">清空</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      params: {},
      formRules: {
        departure: [
          "departure",
          {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "出发地不能为空",
              },
            ],
            normalize: (val) => {
              return val && val.trim();
            },
            trigger: "change",
          },
        ],
        destination: [
          "destination",
          {
            rules: [
              {
                required: true,
                whitespace: true,
                message: "出发地不能为空",
              },
            ],
            normalize: (val) => {
              return val && val.trim();
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.form.resetFields();
    },
    query() {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          return;
        }
        values.returnDate = null;
        console.log("query=====>", values);
        // TODO 调用接口
      });
    },
    initForm(params) {
      if (params) {
        this.params = params;
      }
      params = params || this.params;
      console.log("params=====>", params);
      // 注册
      for (var key in params) {
        this.form.getFieldDecorator(key, {
          preserve: true,
          initialValue: params[key],
        });
      }
      // 初始化赋值
      this.form.setFieldsValue({ ...params });
    },
  },
  mounted() {
    this.initForm({
      departure: "shanghai",
      returnDate: [moment().format("Y-MM-DD"), moment().format("Y-MM-DD")],
    });
  },
};
</script>