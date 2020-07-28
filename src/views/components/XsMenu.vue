<template>
  <a-menu
    mode="inline"
    @click="openMenu"
    @openChange="openChange"
    :selectedKeys="openKeys"
    :openKeys="openKeys"
  >
    <template v-for="item in menuList">
      <a-menu-item v-if="!item.children || !item.children.length" :key="item.key">
        <a-icon :type="item.icon" />
        <span>{{item.title}}</span>
      </a-menu-item>
      <xs-menu-item v-else :menuInfo="item" :key="item.key" />
    </template>
  </a-menu>
</template>

<script>
import XsMenuItem from "@/views/components/XsMenuItem";

const menuList = [
  {
    key: "demo",
    title: "表格2",
    icon: "table",
    children: [
      {
        key: "demo22",
        path: "/demo2",
        title: "表格22",
        icon: "home"
      }
    ]
  },
  {
    key: "demo3",
    title: "表格3",
    icon: "table",
    children: [
      {
        key: "demo33",
        path: "/demo3",
        title: "表格33",
        icon: "user"
      }
    ]
  }
];

/**
 * 根据路由地址查找菜单
 */
const findMenu = function(list, path) {
  var menu = null;
  list.find(item => {
    if (item.path === path) {
      menu = item;
      return true;
    }
    let children = item.children;
    if (children && children.length) {
      menu = findMenu(children, path);
      return menu;
    }
    return false;
  });
  return menu;
};

/**
 * 组装一个Map对象，key=菜单对象.key，value=菜单对象
 */
const menuToMap = function(list) {
  return list.flatMap(item => {
    let arr = [[item.key, item]];
    let children = item.children;
    if (children && children.length) {
      return arr.concat(menuToMap(children));
    }
    return arr;
  });
};

/**
 * 根据当前菜单获取上级菜单
 */
const getOpenMenus = function(menu) {
  return [menu].flatMap(item => {
    let arr = [];
    let parent = item.parent;
    if (parent) {
      arr = arr.concat(getOpenMenus(parent));
    }
    arr.push(item);
    return arr;
  });
};

/**
 * 设置菜单上级
 */
const setMenuParent = function(list, parent = null) {
  list.forEach(item => {
    item.parent = parent;
    let children = item.children;
    if (children && children.length) {
      setMenuParent(children, item);
    }
  });
};

// 初始化菜单上级
setMenuParent(menuList);

export default {
  components: {
    XsMenuItem
  },
  data() {
    return {
      menuList,
      openKeys: [], // 打开的菜单的key集合，用户菜单展开
      openMenus: [], // 打开的菜单的对象集合，用于面包屑导航
      currentMenu: null
    };
  },
  computed: {
    menuObject() {
      return new Map(menuToMap(this.menuList));
    }
  },
  methods: {
    openMenu({ key }) {
      const menu = this.menuObject.get(key);
      this.$router.push(menu.path);
    },
    openChange(openKeys) {
      this.openKeys = openKeys;
    },
    initMenu() {
      // 拆分路由地址 /c/c2/1 => ['/c', '/c/c2', '/c/c2/1']
      let arr = [];
      const curPath = this.$route.path;
      if (!curPath || curPath === "/") {
        return;
      }
      curPath.match(/\/{1}(\w)+/gi).reduce((accumulator, currentValue) => {
        arr.unshift(accumulator);
        return accumulator + currentValue;
      });
      arr.unshift(curPath);

      // 获取路由映射到的菜单
      let menu = null;
      arr.some(path => {
        return (menu = findMenu(this.menuList, path));
      });

      // 获取打开的菜单
      this.currentMenu = menu;
      this.openMenus = menu && getOpenMenus(menu);
      this.openKeys = this.openMenus && this.openMenus.map(item => item.key);

      const { currentMenu, openMenus } = this;
      this.$store.commit("home/SET_MENU", { currentMenu, openMenus });
    }
  },
  watch: {
    "$route.path": function() {
      this.initMenu();
    }
  },
  mounted() {
    this.$nextTick(this.initMenu);
  }
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
/** 放上菜单的字体颜色 */
.ant-menu-item:hover,
.ant-menu-item-active,
.ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
.ant-menu-submenu-active,
.ant-menu-submenu-title:hover,
.ant-menu-submenu-selected,
.ant-menu-item-selected {
  color: #4c33bb !important;
}
.theme-red .ant-menu-item:hover,
.theme-red .ant-menu-item-active,
.theme-red .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
.theme-red .ant-menu-submenu-active,
.theme-red .ant-menu-submenu-title:hover,
.theme-red .ant-menu-submenu-selected,
.theme-red .ant-menu-item-selected {
  color: #df1764 !important;
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
  background: linear-gradient(to right, #4c33bb, #4c33bb) !important;
}

.theme-red
  .ant-menu-submenu-vertical
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::after,
.theme-red
  .ant-menu-submenu-vertical-left
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::after,
.theme-red
  .ant-menu-submenu-vertical-right
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::after,
.theme-red
  .ant-menu-submenu-inline
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::after,
.theme-red
  .ant-menu-submenu-vertical
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::before,
.theme-red
  .ant-menu-submenu-vertical-left
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::before,
.theme-red
  .ant-menu-submenu-vertical-right
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::before,
.theme-red
  .ant-menu-submenu-inline
  > .ant-menu-submenu-title:hover
  .ant-menu-submenu-arrow::before {
  background: linear-gradient(to right, #df1764, #df1764) !important;
}
/** 选中菜单的背景颜色 */
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: rgba(76, 51, 187, 0.1) !important;
}

.theme-red .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: rgba(223, 23, 100, 0.1) !important;
}

/** 选中菜单右侧边线的颜色 */
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  height: 50%;
  top: 25% !important;
  border-right: 4px solid #4c33bb !important;
}

.theme-red .ant-menu-vertical .ant-menu-item::after,
.theme-red .ant-menu-vertical-left .ant-menu-item::after,
.theme-red .ant-menu-vertical-right .ant-menu-item::after,
.theme-red .ant-menu-inline .ant-menu-item::after {
  border-right: 4px solid #df1764 !important;
}
</style>