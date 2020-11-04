<template>
  <div class="container">
    <div class="container-left">
      <ul>
        <li class="active">今日</li>
        <li>之前</li>
      </ul>
    </div>
    <div class="container-right">
      <div class="right-box">
        <div :class="['input', focus ? 'input-focus':'']">
          <a-input @keyup.enter="add" v-model="value" placeholder="do"></a-input>
        </div>
        <a-tabs>
          <a-tab-pane key="1" tab="待办">
            <ul class="list">
              <li v-for="(value,key) in todoList" :key="key" @click="done(key)">
                <div>
                  <span>{{value}}</span>
                </div>
              </li>
            </ul>
          </a-tab-pane>
          <a-tab-pane key="2" tab="已办">
            <ul class="list">
              <li v-for="(value,key) in doneList" :key="key" class="done">
                <div>
                  <span>{{value}}</span>
                </div>
              </li>
            </ul>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      todoList: [],
      doneList: [],
      value: null,
    };
  },
  methods: {
    add() {
      this.todoList.unshift(this.value);
      this.value = null;
    },
    done(key) {
      const value = this.todoList.splice(key, 1);
      this.doneList.unshift(value[0]);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  background-color: #fff;
  font-weight: 300;
}
.container-left {
  background-color: #f9f9f9;
  border-right: 1px solid #f1f1f1;
  padding-top: 50px;
}
ul {
  list-style: none;
  padding: 0;
}
.container-left ul li {
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  margin: 2px auto;
  font-size: 14px;
  text-align: right;
  transition: 300ms ease-in-out;
  cursor: pointer;
  color: #234;
}
.container-left ul li:hover {
  background-color: rgba(40, 34, 146, 0.05);
  color: #6c63ff;
}
.container-left ul li.active {
  background-color: rgba(40, 34, 146, 0.05);
  box-shadow: inset -2px 0 0 #6c63ff;
  color: #6c63ff;
  font-weight: bold;
}
.container-right {
  height: 100%;
}
.right-box {
  max-width: 480px;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  /* margin: auto; */
}
.container-right ul li {
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  margin: 10px auto;
  font-size: 14px;
  transition: 300ms ease-in-out;
  cursor: pointer;
  color: #234;
  border: 1px solid rgba(40, 34, 146, 0.05);
}
.container-right ul li:hover {
  color: #6c63ff;
  background-color: rgba(40, 34, 146, 0.02);
  border-color: #6c63ff;
}
.container-right ul li.done {
  color: #aaa;
}
.container-right .input .ant-input {
  height: 60px;
  font-size: 14px;
  padding: 0 20px;
  border-radius: 0;
  border: none;
  background-color: rgba(40, 34, 146, 0.05);
  color: #6c63ff;
}
.container-right .input .ant-input:focus {
  box-shadow: none;
}
.container-right .input {
  margin-bottom: 30px;
}
.number {
  color: #6c63ff;
  display: inline-block;
  margin-right: 10px;
}
</style>

<style>
.container-right .ant-tabs .ant-tabs-tabpane {
  padding: 0;
}
</style>