<template>
  <a-dropdown>
    <div class="xs-user-info">
      <a-avatar class="xs-avatar" icon="user" />
      <span>{{ chineseName }}</span>
      <a-icon type="caret-down" />
    </div>
    <div slot="overlay" class="xs-user-drop-down">
      <div class="xs-user-detail">
        <div href="javascript:void(520)" class="xs-user-cname">
          <span>{{ chineseName }}</span>
          <!-- <a-icon type="right" /> -->
        </div>
        <div>
          <a-icon type="user" />
          {{ user.username || "未知" }}
        </div>
        <div>
          <a-icon type="phone" />
          {{ user.phone || "未知" }}
        </div>
        <div>
          <a-icon type="mail" />
          {{ user.email || "未知" }}
        </div>
      </div>
      <a-divider></a-divider>
      <a-button
        type="danger"
        block
        icon="poweroff"
        @click="logout"
        class="xs-logout-btn"
        >退出登录</a-button
      >
    </div>
  </a-dropdown>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.home.userInfo || {};
    },
    chineseName() {
      return this.user.chineseName || "未知";
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("home/logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
  mounted() {
    // FIXME 调用后台加载用户信息
    // this.$store.dispatch("home/getUserInfo");
  },
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
  font-size: 12px;
  cursor: pointer;
  transition: 300ms ease-out;
}
.xs-user-info.ant-dropdown-open {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.9);
}
.xs-user-info .anticon {
  transition: 300ms ease-out;
}
.xs-user-info .xs-avatar {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.6);
}
.xs-user-info.ant-dropdown-open .anticon {
  transform: rotate(180deg);
}
.xs-user-drop-down {
  min-width: 240px;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  margin-right: 4px;
  color: #333;
  border-radius: 2px;
  box-shadow: 0 2px 4px 1px #ccc;
}
.xs-user-drop-down .ant-divider {
  margin: 10px auto;
}
.xs-user-detail {
  color: #999;
}
.xs-user-detail div {
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.xs-user-detail div:last-child {
  margin-bottom: 20px;
}
.xs-user-detail div .anticon {
  margin-right: 8px;
}
.xs-user-detail .xs-user-cname {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  color: #333;
}
.xs-user-detail .xs-user-cname span {
  font-size: 18px;
}
.xs-user-detail .xs-user-cname .anticon {
  font-size: 12px;
}
.xs-user-drop-down .xs-logout-btn {
  padding: 0;
  height: 40px;
  line-height: 40px;
}
</style>