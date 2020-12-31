<template>
  <div class="dropdown async-dropdown">
    <div class="header">
      <span :class="active == 1 ? 'active' : ''" @click="active = 1"
        >执行中</span
      >
      <span :class="active == 2 ? 'active' : ''" @click="active = 2"
        >已完成</span
      >
    </div>
    <div class="content">
      <div :class="['tab', active == 1 ? 'active' : '']">
        <ul>
          <li class="item" v-for="(item, index) in 10" :key="index">
            <span class="label">付款申请</span>
            <span class="status">
              <a-icon type="loading" />
            </span>
          </li>
        </ul>
      </div>

      <div :class="['tab', active == 2 ? 'active' : '']">
        <ul>
          <li class="item" v-for="(item, index) in 10" :key="index">
            <span class="label">付款申请</span>
            <span class="action">
              <a-button type="primary">下载</a-button>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <a-button type="link" block>查看更多</a-button>
    </div>
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

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.async-dropdown {
  display: none;
  top: 51px;
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
    filter: opacity(0.9);
  }
  100% {
    top: 51px;
    filter: opacity(1);
  }
}
.async-dropdown::before {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  border-bottom: 6px solid #f9f9f9;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  transform: translateX(-50%);
  z-index: 99;
}
.async-dropdown .content {
  width: 100%;
  padding: 0 15px;
  max-height: 400px;
  overflow: auto;
}
.async-dropdown .content .empty {
  padding: 20px;
  text-align: center;
  color: #ccc;
}
.async-dropdown li {
  color: #666;
  font-size: 14px;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.async-dropdown li:not(:last-child) {
  border-bottom: 1px solid #f1f1f1;
}
.async-dropdown li > {
  flex: none;
}
.async-dropdown li .action .ant-btn {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  padding: 0 12px;
  margin: 0;
  border-radius: 20px;
  box-sizing: content-box;
}
.async-dropdown .header {
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  color: #999;
}
.async-dropdown .header > span {
  flex-grow: 1;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
}
.async-dropdown .header > span.active,
.async-dropdown .header > span:hover {
  color: #546de5;
  cursor: pointer;
  font-weight: bold;
}
.async-dropdown .header > span.active::before {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 50%;
  height: 3px;
  width: 30px;
  background-color: #546de5;
  transform: translateX(-50%);
}
.async-dropdown .footer {
  border-top: 1px solid #f1f1f1;
}
.async-dropdown .footer .ant-btn {
  padding: 0;
  height: 40px;
  line-height: 40px;
  color: #999;
  font-size: 13px;
  box-sizing: content-box;
}
.async-dropdown .footer .ant-btn:hover {
  color: #546de5;
}
.async-dropdown .tab.active {
  display: block;
}
.async-dropdown .tab {
  display: none;
}
</style>