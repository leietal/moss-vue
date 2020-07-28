<template>
  <div id="app">
    <a-config-provider :locale="zh_CN">
      <div class="layout-container">
        <nav class="layout-nav">
          <!-- logo -->
          <div class="nav-logo">
            <span>后台管理系统</span>
          </div>
          <!-- 面包屑 -->
          <xs-breadcrumb class="nav-breadcrumb" />
          <!-- 工具条 -->
          <xs-tool-bar class="nav-tool-bar" />
          <!-- 用户信息 -->
          <xs-login-user class="nav-user" />
        </nav>

        <div class="layout-main">
          <div class="layout-left">
            <xs-menu />
          </div>
          <div class="layout-right">
            <router-view />
          </div>
        </div>
      </div>
    </a-config-provider>
  </div>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import XsMenu from "@/views/components/XsMenu";
import XsBreadcrumb from "@/views/components/XsBreadcrumb";
import XsLoginUser from "@/views/components/XsLoginUser";
import XsToolBar from "@/views/components/XsToolBar";

export default {
  components: {
    XsMenu,
    XsBreadcrumb,
    XsLoginUser,
    XsToolBar
  },
  data() {
    return {
      zh_CN
    };
  },
  methods: {}
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
  background-color: #6432d1;
  display: grid;
  grid-template-columns: 200px auto 1fr auto;
}
.layout-nav .nav-logo {
  height: 100%;
  width: 200px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
}
.layout-nav .nav-logo > span {
  display: block;
  height: 100%;
  width: 100%;
  font-size: 20px;
  line-height: 2.5;
  text-align: center;
  color: #fff;
  letter-spacing: 1px;
}
.layout-nav .nav-breadcrumb {
  height: 100%;
  line-height: 50px;
  padding: 0 20px;
}
.layout-nav .nav-tool-bar {
  justify-self: flex-end;
}
.layout-nav .nav-user {
  line-height: 50px;
}
.layout-main {
  display: grid;
  grid-template-columns: 200px auto;
  overflow: hidden;
}
.layout-left {
  background-color: #fff;
  overflow: auto;
  box-shadow: 0 0 4px 1px #e1e5e9;
}
.layout-right {
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f7f9fa;
}
</style>

<style>
.ant-table-row:nth-child(even) {
  background-color: rgba(100, 50, 209, 0.05);
}
.ant-table-small .ant-table-body {
  margin: 0 !important;
}
.ant-form-item .ant-btn:not(:last-child) {
  margin-right: 5px;
}
</style>
