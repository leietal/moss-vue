<template>
  <a-dropdown
    :trigger="['click']"
    @click="(e) => e.preventDefault()"
    v-model="visible"
  >
    <div class="account-info">
      <a-avatar class="avatar" icon="user" />
      <span>{{ user.cname || "匿名用户" }}</span>
      <a-icon type="caret-down" />
    </div>
    <div slot="overlay" class="drop-panel" @click="(e) => e.preventDefault()">
      <a class="username" href="javascript:void(520)">
        <span>匿名用户</span>
        <a-icon type="arrow-right" />
      </a>
      <div>账号：leijiaping</div>
      <div>手机：15618526752</div>
      <a-button class="btn-logout" type="danger" block icon="logout"
        >退出登录</a-button
      >
    </div>
  </a-dropdown>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.home.loginUser || {};
    },
  },
};
</script>

<style scoped>
.account-info {
  padding: 0 15px;
  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  cursor: pointer;
  transition: 300ms ease-out;
}
.account-info .avatar {
  background-color: rgba(0, 0, 0, 0.12);
  color: rgba(255, 255, 255, 0.6);
}
.account-info:hover,
.account-info.ant-dropdown-open {
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
}
.account-info .anticon {
  transition: 300ms ease-out;
}
.account-info.ant-dropdown-open .anticon {
  transform: rotate(180deg);
}
.ant-dropdown .drop-panel {
  min-width: 220px;
  padding: 20px;
  background-color: #fff;
  margin-right: 4px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 1px rgba(107, 99, 255, 0.3);
  display: grid;
  gap: 10px;
}
.drop-panel .username {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #585858;
  margin-bottom: 10px;
}
.drop-panel .username:hover .anticon {
  animation: moveicon 600ms ease-in-out infinite alternate;
}
@keyframes moveicon {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(10px);
  }
}
.drop-panel .username .anticon {
  font-size: 14px;
}
.drop-panel .btn-logout {
  height: 38px;
  line-height: 38px;
  padding: 0;
  margin-top: 10px;
}
</style>