<template>
  <a-dropdown>
    <div class="xs-user-info">
      <a-avatar style="backgroundColor:rgba(0,0,0,.25)" icon="user" />
      <span>{{user.cname || '未知用户'}}</span>
      <a-icon type="caret-down" />
    </div>
    <div slot="overlay" class="xs-user-drop-down">
      <a-button type="danger" block>退出登录</a-button>
    </div>
  </a-dropdown>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.loginUser || {};
    }
  }
};
</script>

<style scoped>
.xs-user-info {
  padding: 0 20px;
  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  cursor: pointer;
}
.xs-user-drop-down {
  min-width: 180px;
  padding: 20px;
  background-color: #fff;
  margin-top: -2px;
  margin-right: 2px;
  color: #4c33bb;
  border-radius: 2px;
  box-shadow: 0 2px 4px 1px rgba(76, 51, 187, 0.3);
}
</style>