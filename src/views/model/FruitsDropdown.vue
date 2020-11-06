<template>
  <div
    :class="['dropdown-panel', down ? 'dropdown-open-panel' : '']"
    @mouseenter="down = true"
    @mouseleave="down = false"
  >
    <h1>
      {{ text }}
      <a-icon type="caret-down" />
    </h1>
    <div v-show="down" class="dropdown-list">
      <h4
        v-for="(item, index) in list"
        :key="index"
        @click="select(item[0])"
        :class="[value == item[0] ? 'active' : '']"
      >
        {{ item[1] }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "options"],
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      down: false,
      list: new Map(this.options.map(({ value, label }) => [value, label])),
    };
  },
  computed: {
    text() {
      return this.list.get(this.value) || "请选择";
    },
  },
  methods: {
    select(val) {
      this.down = false;
      this.$emit("change", val);
    },
  },
};
</script>

<style scoped>
.dropdown-panel {
  position: relative;
}
.dropdown-panel h1 {
  background: #fff;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  font-weight: 300;
  border-radius: 2px;
  margin: 0;
  border: 1px solid #f1f1f1;
}
.dropdown-panel .anticon {
  color: #888;
  font-size: 16px;
  transition: 300ms ease;
}
.dropdown-open-panel.dropdown-panel h1 {
  color: coral;
}
.dropdown-open-panel.dropdown-panel .anticon {
  transform: rotate(180deg);
}
.dropdown-list {
  border-radius: 2px;
  overflow: hidden;
  display: grid;
  box-shadow: 0 2px 4px 0 #ccc;
  padding: 5px;
  background-color: #fff;
  gap: 5px;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 999;
}
.dropdown-list h4 {
  padding: 10px;
  cursor: pointer;
  margin: 0;
  transition: 300ms ease;
  font-weight: 300;
  background-color: #f7f7f7;
}
.dropdown-list h4.active {
  color: coral;
  box-shadow: inset 2px 0 0 coral;
  font-weight: bold;
  background-color: #ffe9e1;
}
.dropdown-list h4:hover {
  color: coral;
  background-color: #ffe9e1;
}
</style>
