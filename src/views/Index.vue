<template>
  <div
    :class="['layout-container', menuCollapsed && 'layout-collapsed-container']"
  >
    <nav class="layout-nav">
      <!-- logo -->
      <div class="nav-logo">
        <span v-if="menuCollapsed"><a-icon type="exclamation-circle" /></span>
        <span v-else>后台管理</span>
      </div>
      <!-- 菜单展开收缩 -->
      <div class="nav-collapsed">
        <a-button
          :icon="menuCollapsed ? 'menu-unfold' : 'menu-fold'"
          type="link"
          @click="changeMenuCollapsed"
        />
      </div>
      <!-- 面包屑 -->
      <!-- <nav-breadcrumb class="nav-breadcrumb" /> -->
      <!-- 工具条 -->
      <nav-tool-bar class="nav-tool-bar" />
      <!-- 登录账号信息 -->
      <nav-account class="nav-account" />
    </nav>

    <div class="layout-main">
      <div class="layout-left">
        <menu-list />
      </div>
      <div class="layout-right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MenuList from "@/views/layout/MenuList";
import NavBreadcrumb from "@/views/layout/NavBreadcrumb";
import NavAccount from "@/views/layout/NavAccount";
import NavToolBar from "@/views/layout/NavToolBar";

const findMenu = function (data, path) {
  if (!data || !data.length) {
    return null;
  }
  return data.find((item) => item.path === path) || findMenu(data.children);
};

export default {
  components: {
    MenuList,
    NavBreadcrumb,
    NavAccount,
    NavToolBar,
  },
  data() {
    return {};
  },
  computed: {
    menuCollapsed() {
      return this.$store.state.home.menuCollapsed;
    },
  },
  methods: {
    changeMenuCollapsed() {
      this.$store.commit("home/SET_MENU_COLLAPSED", !this.menuCollapsed);
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100vh;
  padding: 0;
  margin: 0;
  font-family: "Courier Prime Code", Avenir, Helvetica, Arial, sans-serif;
}
.layout-container {
  display: grid;
  height: 100vh;
  grid-template-rows: 50px auto;
}
.layout-nav {
  background-color: #6c63ff;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
}
.layout-nav .nav-logo {
  height: 100%;
  width: 200px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
}
.layout-collapsed-container .layout-nav .nav-logo {
  width: 80px;
}
.layout-nav .nav-logo > span {
  display: block;
  height: 100%;
  width: 100%;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  letter-spacing: 1px;
}
.nav-collapsed button {
  color: #fff !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 0;
}
.nav-collapsed button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.layout-nav .nav-tool-bar {
  justify-self: flex-end;
}
.layout-nav .nav-account {
  line-height: 50px;
}
.layout-nav .nav-breadcrumb {
  line-height: 50px;
  padding: 0 10px;
}
.layout-main {
  display: grid;
  grid-template-columns: 200px auto;
  overflow: hidden;
}
.layout-collapsed-container .layout-main {
  grid-template-columns: 80px auto;
}
.layout-left {
  background-color: #fff;
  border-right: 1px solid #e9eaeb;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.layout-right {
  overflow: auto;
  box-sizing: border-box;
  background-color: #f9fafb;
}
</style>