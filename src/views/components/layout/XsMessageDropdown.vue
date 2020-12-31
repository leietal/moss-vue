<template>
  <div class="dropdown message-dropdown">
    <div class="header">
      <span :class="active == 1 ? 'active' : ''" @click="active = 1"
        >重要消息</span
      >
      <span :class="active == 2 ? 'active' : ''" @click="active = 2"
        >次要消息</span
      >
      <span :class="active == 3 ? 'active' : ''" @click="active = 3"
        >一般消息</span
      >
    </div>
    <div class="content">
      <div :class="['tab', active == 1 ? 'active' : '']">
        <ul>
          <li>1你有一个付款申请需要待处理</li>
          <li>1某某公司向福建快来充值异常，请处理</li>
          <li>1你有一个付款申请需要待处理</li>
          <li>
            1某某公司向福建快来充值异常，请处理1某某公司向福建快来充值异常，请处理
          </li>
          <li>1某某公司向福建快来充值异常，请处理</li>
          <li>
            1某某公司向福建快来充值异常，请处理1某某公司向福建快来充值异常，请处理
          </li>
          <li>1某某公司向福建快来充值异常，请处理</li>
          <li>1某某公司向福建快来充值异常，请处理</li>
          <li>1某某公司向福建快来充值异常，请处理</li>
        </ul>
      </div>
      <div :class="['tab', active == 2 ? 'active' : '']">
        <ul>
          <li>你有一个付款申请需要待处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>你有一个付款申请需要待处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
          <li>某某公司向福建快来充值异常，请处理</li>
        </ul>
      </div>
      <div :class="['tab', active == 3 ? 'active' : '']">
        <div class="empty">暂无数据</div>
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
.message-dropdown {
  display: none;
  top: 51px;
  left: 50%;
  position: absolute;
  width: 380px;
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
.message-dropdown::before {
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
.message-dropdown .content {
  width: 100%;
  padding: 0 15px;
  max-height: 400px;
  overflow: auto;
}
.message-dropdown .content .empty {
  padding: 20px;
  text-align: center;
  color: #ccc;
}
.message-dropdown li {
  color: #666;
  font-size: 14px;
  padding: 15px 0;
}
.message-dropdown li:not(:last-child) {
  border-bottom: 1px solid #f1f1f1;
}
.message-dropdown .header {
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  color: #999;
}
.message-dropdown .header > span {
  flex-grow: 1;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
}
.message-dropdown .header > span.active,
.message-dropdown .header > span:hover {
  color: #546de5;
  cursor: pointer;
}
.message-dropdown .header > span.active::before {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 50%;
  height: 3px;
  width: 30px;
  background-color: #546de5;
  transform: translateX(-50%);
}
.message-dropdown .header .poit {
  display: inline-block;
  margin-left: 4px;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  padding: 0 6px;
  border-radius: 20px;
  background-color: #546de5;
  color: #fff;
}
.message-dropdown .footer {
  border-top: 1px solid #f1f1f1;
}
.message-dropdown .footer .ant-btn {
  padding: 0;
  height: 40px;
  line-height: 40px;
  color: #999;
  font-size: 13px;
  box-sizing: content-box;
}
.message-dropdown .footer .ant-btn:hover {
  color: #546de5;
}
.message-dropdown .tab.active {
  display: block;
}
.message-dropdown .tab {
  display: none;
}
</style>