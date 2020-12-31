<template>
  <a-range-picker
    v-model="dateValue"
    style="width: 100%"
    valueFormat="YYYY-MM-DD"
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
    begin: {
      type: String,
      default: "beginDate",
    },
    end: {
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
        this.form[this.begin] = beginDate && `${beginDate} 00:00:00`;
        this.form[this.end] = endDate && `${endDate} 23:59:59`;
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {},
};
</script>