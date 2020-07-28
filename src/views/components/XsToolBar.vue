<template>
  <div class="xs-tool-list">
    <div class="xs-tool-item">
      <a-icon type="bug" />消息
    </div>
    <div class="xs-tool-item">
      <a-icon type="bell" />待办
    </div>
    <div class="xs-tool-item">
      <a-icon type="audio" />测试
    </div>
    <div class="xs-tool-item">
      <a-icon type="appstore" />更多
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.xs-tool-list {
  padding: 8px 10px;
  display: grid;
  gap: 9px;
  grid-auto-flow: column;
  align-items: center;
  box-sizing: border-box;
}
.xs-tool-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  border-radius: 2px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: 300ms ease-out;
  position: relative;
}
.xs-tool-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 1);
}
.xs-tool-item:not(:last-child)::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 10px;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.3);
}
.xs-tool-item .anticon {
  margin-right: 5px;
}
</style>