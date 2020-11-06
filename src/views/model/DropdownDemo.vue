<template>
  <div class="container">
    <a-page-header
      class="header"
      title="父子组件双向绑定"
      sub-title="自定义下拉框"
    />
    <div class="fruits-dropdown-container">
      <h2>我想吃{{ fruits | getDictLabel(list) }}</h2>
      <fruits-dropdown v-model="fruits" :options="list" />
    </div>

    <div style="margin: 50px auto; width: 400px">
      <a-select :options="user_status" style="width: 100%" v-model="user" />
      <h3>状态：{{ user | getDictLabel(task_status) }}</h3>
    </div>
  </div>
</template>

<script>
import FruitsDropdown from "@/views/model/FruitsDropdown";
export default {
  components: {
    FruitsDropdown,
  },
  data() {
    return {
      user: 1,
      fruits: 1,
      list: [
        {
          value: 1,
          label: "香蕉🍌",
        },
        {
          value: 2,
          label: "西瓜🍉",
        },
        {
          value: 3,
          label: "橘子🍊",
        },
      ],
      user_status: null,
      task_status: null,
    };
  },
  beforeCreate() {
    this.getDicts(["user_status", "task_status"]);
  },
};
</script>

<style scoped>
.fruits-dropdown-container {
  margin: 50px auto;
  width: 300px;
}
</style>
