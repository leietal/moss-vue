<template>
  <div
    :class="['layout-container', menuCollapsed && 'layout-container-collapsed']"
  >
    <nav class="layout-nav">
      <!-- logo -->
      <div class="nav-logo">
        <span v-if="!menuCollapsed">MOSS管理后台</span>
        <span v-else>MOSS</span>
      </div>
      <!-- 菜单展开收缩 -->
      <div class="nav-collapsed">
        <a-tooltip
          placement="bottom"
          :title="menuCollapsed ? '展开菜单' : '折叠菜单'"
          :mouseEnterDelay="1"
        >
          <a-button
            :icon="menuCollapsed ? 'menu-unfold' : 'menu-fold'"
            @click="changeMenuCollapsed"
          />
        </a-tooltip>
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
        <xs-menu :data="menuList" />
      </div>
      <div class="layout-right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import XsMenu from "@/views/components/layout/XsMenu";
import XsBreadcrumb from "@/views/components/layout/XsBreadcrumb";
import XsLoginUser from "@/views/components/layout/XsLoginUser";
import XsToolBar from "@/views/components/layout/XsToolBar";
import { queryResourceList } from "@/services/home";

/**
 * 转换router树到map
 */
const treeToMap = function (data, map, key) {
  if (!data || !data.length || !key) {
    return;
  }
  data.forEach((item) => {
    const { children } = item;
    // 初始化子菜单
    if (children && children.length) {
      treeToMap(children, map, key);
    }
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
};

const menuList = [
  {
    name: "消息通知模板配置",
    link: "/message_config",
    icon: "edit",
    id: 100,
    visible: true,
    children: [
      {
        name: "消息通知模板配置明细",
        link: "/message_config/detail",
        icon: "edit",
        id: 10001,
        visible: false,
      },
    ],
  },
  {
    name: "消息通知",
    link: "/message_list",
    icon: "edit",
    id: 101,
    visible: true,
  },
  {
    name: "通用导入模板配置",
    link: "/excel_config",
    icon: "edit",
    id: 102,
    visible: true,
    children: [
      {
        name: "通用导入模板配置明细",
        link: "/excel_config/detail",
        icon: "edit",
        id: 10201,
        visible: false,
      },
    ],
  },
  {
    name: "通用导入",
    link: "/excel_import",
    icon: "edit",
    id: 103,
    visible: true,
    children: [
      {
        name: "通用导入明细",
        link: "/excel_import/detail",
        icon: "edit",
        id: 10301,
        visible: false,
      },
    ],
  },
];

export default {
  components: {
    XsMenu,
    XsBreadcrumb,
    XsLoginUser,
    XsToolBar,
  },
  data() {
    return {
      defaultSelectedKeys: ["/home"],
      menuList: [],
      menuIdMap: new Map(),
      menuPathMap: new Map(),
    };
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
  mounted() {
    this.$nextTick(() => {
      // FIXME 调用后台加载菜单树
      // queryResourceList().then(({ data }) => {
      this.menuList = menuList;
      treeToMap(menuList, this.menuIdMap, "id");
      treeToMap(menuList, this.menuPathMap, "link");
      // });
    });
  },
};
</script>

<style scoped>
.layout-container {
  display: grid;
  height: 100vh;
  grid-template-rows: 50px auto;
}
.layout-nav {
  background-color: #546de5;
  display: grid;
  grid-template-columns: 200px auto auto 1fr auto;
}
.layout-container-collapsed .layout-nav {
  grid-template-columns: 80px auto auto 1fr auto;
}
.layout-nav .nav-logo {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  justify-self: flex-start;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.layout-nav .nav-logo > span {
  display: block;
  height: 100%;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  letter-spacing: 1px;
}
.layout-nav .nav-collapsed {
  line-height: 50px;
  padding: 0 10px;
}
.nav-collapsed button {
  border: none;
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1);
}
.nav-collapsed button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
.layout-nav .nav-tool-bar {
  justify-self: flex-end;
}
.layout-nav .nav-user {
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
.layout-left {
  background-color: #fff;
  border-right: 1px solid #e9eaeb;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.layout-container-collapsed .layout-main {
  grid-template-columns: 80px auto;
}
.layout-right {
  overflow: auto;
  box-sizing: border-box;
  background-color: #f9fafb;
}
</style>
