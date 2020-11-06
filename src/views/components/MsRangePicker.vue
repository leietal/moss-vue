<template>
  <a-range-picker
    v-model="dateValue"
    style="width: 100%"
    valueFormat="Y-MM-DD"
    @change="change"
  />
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    beginDate: {
      type: String,
      default: "beginDate",
    },
    endDate: {
      type: String,
      default: "endDate",
    },
    value: Array,
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      dateValue: null,
    };
  },
  methods: {
    change(val) {
      this.$emit("change", val);
    },
  },
  watch: {
    value: {
      handler(val) {
        this.dateValue = val;
        let [beginDate, endDate] = val || [];
        this.form.setFieldsValue({
          [this.beginDate]: beginDate && `${beginDate} 00:00:00`,
          [this.endDate]: endDate && `${endDate} 23:59:59`,
        });
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.form.getFieldDecorator([this.beginDate], { preserve: true });
    this.form.getFieldDecorator([this.endDate], { preserve: true });
  },
};
</script>