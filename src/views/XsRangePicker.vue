<template>
  <a-range-picker
    @change="changeDate"
    v-model="dateValue"
    style="width: 100%"
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
    changeDate(val) {
      console.log("==range=======>", this, val);
      this.form.setFieldsValue({
        [this.beginDate]: val && val[0].format("Y-MM-DD 00:00:00"),
        [this.endDate]: val && val[1].format("Y-MM-DD 23:59:59"),
      });
      this.$emit("change", val);
    },
  },
  watch: {
    value: {
      handler(val) {
        this.dateValue = val;
      },
      immediate: true,
    },
  },
  mounted() {
    this.form.getFieldDecorator([this.beginDate], { preserve: true });
    this.form.getFieldDecorator([this.endDate], { preserve: true });
  },
};
</script>