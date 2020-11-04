<template>
  <div class="container">
    <h1 @click="down=!down">
      {{text}}
      <a-icon type="caret-down" />
    </h1>

    <div v-show="down" class="dropdown">
      <h4 v-for="(item,index) in list" :key="index" @click="select(item[0])">{{item[1]}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  // model: {
  //   prop: "value",
  //   event: "change",
  // },
  data() {
    return {
      down: false,
      list: new Map([
        [1, "苹果"],
        [2, "西瓜🍉"],
        [3, "橘子🍊"],
      ]),
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
      this.$emit("input", val);
    },
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  width: 400px;
}
.container h1 {
  background: #eee;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.dropdown {
  padding: 6px;
  border: 2px solid #eee;
}

.dropdown h4 {
  background: #eee;
  padding: 10px 20px;
  cursor: pointer;
  transition: 300ms ease;
}
.dropdown h4:hover {
  background: coral;
  color: #fff;
}
</style>
