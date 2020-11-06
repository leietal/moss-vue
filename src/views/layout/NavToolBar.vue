<template>
  <div class="tool-list">
    <div class="tool-item">
      <a-icon type="bug" />
      <span class="item-text">消息</span>
    </div>
    <div class="tool-item">
      <a-icon type="bell" />
      <span class="item-text">待办</span>
    </div>
    <div class="tool-item">
      <a-icon type="audio" />
      <span class="item-text">测试</span>
    </div>
    <div class="tool-item">
      <a-icon type="appstore" />
      <span class="item-text">更多</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.tool-list {
  display: grid;
  gap: 2px;
  grid-auto-flow: column;
  box-sizing: border-box;
}
.tool-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: 300ms ease-out;
  position: relative;
  font-size: 0;
}
.tool-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 1);
}
.tool-item .anticon {
  font-size: 12px;
}
.tool-item .item-text {
  font-size: 12px;
  margin-left: 5px;
}
</style>