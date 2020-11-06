<template>
  <a-menu
    mode="inline"
    @click="openMenu"
    @openChange="openChange"
    :selectedKeys="selectedKeys"
    :openKeys="openKeys"
    :inlineCollapsed="$store.state.home.menuCollapsed"
  >
    <template v-for="item in menuList">
      <a-menu-item
        v-if="!item.children || !item.children.length"
        :key="item.key"
      >
        <a-icon :type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
      <menu-item v-else :menuInfo="item" :key="item.key" />
    </template>
  </a-menu>
</template>

<script>
import MenuItem from "@/views/layout/MenuItem";
import { menuList as menuSource } from "@/views/layout/data/menuList";

// 转换后台菜单
const transformMenuData = function (data, parent) {
  if (!data) {
    return null;
  }
  return data.map((item) => {
    const { id: key, icon, name: title, link: path, children, visible } = item;
    let _children = [];
    if (children && children.length) {
      _children = transformMenuData(children, key);
    }
    return {
      key,
      icon,
      title,
      children: _children,
      path,
      parent,
      visible,
    };
  });
};

// 转换成平面菜单
const flatMenu = function (data, key) {
  return data.reduce((accumulator, item) => {
    let { children } = item;
    if (children && children.length) {
      accumulator = accumulator.concat(flatMenu(children, key));
    }
    accumulator.push([item[key], item]);
    return accumulator;
  }, []);
};

// 初始化数据
const menuList = transformMenuData(menuSource);
const menuMap = new Map(flatMenu(menuList, "key"));
const menuPathMap = new Map(flatMenu(menuList, "path"));

export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      menuList,
      menuMap,
      menuPathMap,
      selectedKeys: [],
      openKeys: [],
    };
  },
  watch: {
    $route: {
      handler(val) {
        const menu = this.menuPathMap.get(val.path);
        if (!menu) {
          return;
        }
        this.selectedKeys = [menu.key];
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    openMenu({ key }) {
      const menu = this.menuMap.get(key);
      this.$router.push(menu.path);
    },
    openChange(openKeys) {
      this.openKeys = openKeys;
    },
  },
};
</script>

<style>
/** 菜单的右侧边线 */
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: none !important;
}
/** 菜单的背景颜色 */
.ant-menu,
.ant-menu .ant-menu-sub {
  background-color: #fff !important;
}
/** 菜单宽度不增加 */
.ant-menu-inline .ant-menu-item,
.ant-menu-inline .ant-menu-submenu-title {
  width: 100% !important;
}
/** 放上菜单的字体颜色 */
.ant-menu-item:hover,
.ant-menu-item-active,
.ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
.ant-menu-submenu-active,
.ant-menu-submenu-title:hover,
.ant-menu-submenu-selected,
.ant-menu-item-selected {
  color: #6c63ff !important;
}
/** 菜单图标的背景颜色 */
.ant-menu-submenu-vertical
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::after,
.ant-menu-submenu-vertical-left
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::after,
.ant-menu-submenu-vertical-right
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::after,
.ant-menu-submenu-inline
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::after,
.ant-menu-submenu-vertical
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::before,
.ant-menu-submenu-vertical-left
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::before,
.ant-menu-submenu-vertical-right
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::before,
.ant-menu-submenu-inline
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::before {
  background: linear-gradient(to right, #6c63ff, #6c63ff) !important;
}
/** 选中菜单的背景颜色 */
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: rgba(76, 51, 187, 0.1) !important;
}
/** 选中菜单右侧边线的颜色 */
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  height: 100%;
  top: 0% !important;
  border-right: 3px solid #6c63ff !important;
}
</style>