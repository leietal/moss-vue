<template>
  <div class="xs-tool-list">
    <div class="xs-tool-item dropdown-hover">
      <a-icon type="bug" />
      <span class="item-text">消息</span>
      <xs-message-dropdown />
    </div>

    <div class="xs-tool-item dropdown-hover">
      <a-icon type="bell" />
      <span class="item-text">待办</span>
      <xs-todo-dropdown />
    </div>

    <div class="xs-tool-item dropdown-hover">
      <a-icon type="audio" />
      <span class="item-text">后台任务</span>
      <xs-async-dropdown />
    </div>
    <!-- <div class="xs-tool-item">
      <a-icon type="appstore" />
      <span class="item-text">更多</span>
    </div> -->
  </div>
</template>

<script>
import XsMessageDropdown from "@/views/components/layout/XsMessageDropdown";
import XsTodoDropdown from "@/views/components/layout/XsTodoDropdown";
import XsAsyncDropdown from "@/views/components/layout/XsAsyncDropdown";
export default {
  data() {
    return {
      active: 1,
    };
  },
  components: {
    XsMessageDropdown,
    XsTodoDropdown,
    XsAsyncDropdown,
  },
};
</script>

<style scoped>
.xs-tool-list {
  display: grid;
  gap: 2px;
  grid-auto-flow: column;
  box-sizing: border-box;
}
.xs-tool-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.6);
  transition: 300ms ease-out;
  position: relative;
}
.xs-tool-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 1);
}
.xs-tool-item .anticon {
  font-size: 12px;
}
.xs-tool-item .item-text {
  font-size: 12px;
  margin-left: 5px;
}
/* 
.xs-tool-item .dropdown {
  display: none;
  top: 50px;
  left: 50%;
  position: absolute;
  width: 240px;
  background-color: #fff;
  transform: translateX(-50%);
  border-radius: 2px;
  box-shadow: 0 2px 4px 1px #e7e7e7;
  border: 1px solid #e7e7e7;
  color: #333;
  transition: 300ms;
}
.xs-tool-item .dropdown::before,
.xs-tool-item .dropdown::after {
  content: "";
  position: absolute;
  left: 50%;
  border-bottom: 6px solid transparent;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  transform: translateX(-50%);
  z-index: 99;
}
.xs-tool-item .dropdown::before {
  top: -7px;
  border-bottom-color: #e7e7e7;
}
.xs-tool-item .dropdown::after {
  top: -6px;
  border-bottom-color: #fff;
}
.xs-tool-item .dropdown ul {
  list-style: none;
  width: 100%;
  padding: 10px;
  margin: 0;
}
.xs-tool-item .dropdown li {
  color: #666;
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  background-color: #f9f9f9;
}
.xs-tool-item .dropdown li:not(:last-child) {
  margin-bottom: 5px;
}
.xs-tool-item .dropdown li > * {
  flex: none;
}
.xs-tool-item .dropdown li .label {
  margin-right: 10px;
}
.xs-tool-item .dropdown li .count {
  color: #546de5;
  font-size: 18px;
}
.xs-tool-item .dropdown li:hover .label,
.xs-tool-item .dropdown li:hover .count,
.xs-tool-item .dropdown li:hover {
  color: #fff;
  background-color: #546de5;
}
.xs-tool-item:hover .dropdown {
  display: block;
}
.xs-tool-item .dropdown .more {
  border-top: 1px solid #f1f1f1;
  padding: 5px 10px;
}

.xs-tool-item .dropdown.message-dropdown {
  width: 300px;
}
.xs-tool-item .dropdown.message-dropdown ul {
  padding: 0 10px;
}
.xs-tool-item .dropdown.message-dropdown li {
  color: #666;
  font-size: 14px;
  padding: 10px 0;
  border-radius: 2px;
  display: block;
  border-bottom: 1px solid #f1f1f1;
  background-color: transparent;
  margin: 0;
}
.xs-tool-item .dropdown.message-dropdown li:hover {
  color: #546de5;
}
.xs-tool-item .dropdown.message-dropdown li:last-child {
  border-bottom: none;
} */
</style>