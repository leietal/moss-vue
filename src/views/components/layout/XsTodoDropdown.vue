<template>
  <div class="dropdown todo-dropdown">
    <div class="content">
      <ul>
        <li class="item" v-for="(item, index) in 5" :key="index">
          <span class="label">付款申请付款</span>
          <span :class="['count', item % 2 == 0 ? 'zero' : '']">{{
            item % 2
          }}</span>
        </li>
      </ul>
    </div>

    <!-- <div class="footer">
      <a-button type="link" block>查看更多</a-button>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "visible",
    event: "change",
  },
  data() {
    return {
      active: 1,
    };
  },
};
</script>

<style>
.dropdown-hover:hover .dropdown {
  display: block;
}
</style>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.todo-dropdown {
  display: none;
  top: 50px;
  left: 50%;
  position: absolute;
  width: 280px;
  background-color: #fff;
  transform: translateX(-50%);
  border-radius: 2px;
  box-shadow: 0 2px 4px 1px #ccc;
  color: #333;
  animation: move 300ms;
  z-index: 999;
}
@keyframes move {
  0% {
    top: 70px;
    filter: opacity(0);
  }
  60% {
    top: 45px;
    filter: opacity(1);
  }
  100% {
    top: 51px;
    filter: opacity(1);
  }
}
.todo-dropdown::before {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  border-bottom: 6px solid #f9f9f9;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  transform: translateX(-50%);
  z-index: 999;
}
.todo-dropdown .content {
  width: 100%;
  padding: 0 15px;
  max-height: 400px;
  overflow: auto;
}
.todo-dropdown .content .empty {
  padding: 20px;
  text-align: center;
  color: #ccc;
}
.todo-dropdown .item {
  color: #666;
  font-size: 14px;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-dropdown .item:not(:last-child) {
  border-bottom: 1px solid #f1f1f1;
}
.todo-dropdown .item .count {
  display: inline-block;
  font-size: 14px;
  font-family: Antonio;
  color: #e74c3c;
  margin-left: 10px;
}
.todo-dropdown .item .count.zero {
  color: #ccc;
}
.todo-dropdown .item:hover {
  color: #546de5;
}
.todo-dropdown .header {
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  background-color: #f9f9f9;
  display: flex;
  color: #999;
}
.todo-dropdown .footer {
  border-top: 1px solid #f1f1f1;
}
.todo-dropdown .footer .ant-btn {
  padding: 0;
  height: 40px;
  line-height: 40px;
  color: #999;
  font-size: 13px;
  box-sizing: content-box;
}
.todo-dropdown .footer .ant-btn:hover {
  color: #546de5;
}
.todo-dropdown .tab.active {
  display: block;
}
.todo-dropdown .tab {
  display: none;
}
</style>