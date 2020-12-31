<template>
  <a-menu
    mode="inline"
    @click="openMenu"
    @openChange="openChange"
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    :inlineCollapsed="$store.state.home.menuCollapsed"
  >
    <template v-for="item in treeData">
      <a-menu-item
        v-if="!item.children || !item.children.length"
        :key="item.id"
      >
        <a-icon :type="item.icon" v-if="item.icon" />
        <span>{{ item.name }}</span>
      </a-menu-item>
      <xs-menu-item v-else :menuInfo="item" :key="item.id"
    /></template>
  </a-menu>
</template>

<script>
import XsMenuItem from "@/views/components/layout/XsMenuItem";

/**
 * 转换router树到map
 */
const initMenuMap = function (data, map, key = "id") {
  data.forEach((item) => {
    const { children } = item;
    // 初始化子菜单
    if (children && children.length) {
      initMenuMap(children, map, key);
    }
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
};

const getOpenKeys = function (map, key) {
  let arr = [];
  const obj = map.get(key);
  if (obj) {
    arr.push(obj);
  }
  if (obj.parentId) {
    arr = arr.concat(getOpenKeys(map, obj.parentId));
  }
  return arr;
};

/**
 * 权限校验用
 */
const treeData2StorageData = function (treeData) {
  return treeData.flatMap((item) => {
    let arr = [];
    let children = item.children;
    if (children && children.length) {
      arr = arr.concat(treeData2StorageData(children));
    }
    if (item.link) {
      arr.push(item.link);
    }
    return arr;
  });
};

export function transformMenuData(data = []) {
  let arr = [];
  data.forEach((item) => {
    const { visible, children } = item;
    if (!visible) {
      return null;
    }
    let subResource =
      (children && children.length && transformMenuData(children)) || [];
    arr.push({
      ...item,
      children: subResource,
    });
  });
  return arr;
}

export default {
  props: ["data"],
  components: {
    XsMenuItem,
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      menuIdMap: new Map(),
      menuLinkMap: new Map(),
      treeData: [],
    };
  },
  methods: {
    openMenu({ key }) {
      let data = this.menuIdMap.get(key);
      if (data && data.link) {
        let tree = getOpenKeys(this.menuIdMap, data.id);
        this.$store.commit("home/SET_CURRENT_MENU", {
          data,
          tree,
        });
        this.$router.push(data.link);
      }
    },
    openChange(openKeys) {
      this.openKeys = openKeys;
    },
    initMenu() {
      const currentMenuKey = this.$store.state.home.currentMenuKey;
      let data = null;
      if (!currentMenuKey) {
        // 获取当前路由path
        const val = this.$route;
        const path = val.matched[val.matched.length - 1].path;
        // 根据路由path得到路由对象
        data = this.menuLinkMap.get(path);
      } else {
        data = this.menuIdMap.get(currentMenuKey);
      }
      if (!data) {
        return;
      }
      let tree = getOpenKeys(this.menuIdMap, data.id);
      this.selectedKeys = [data.id];
      this.openKeys = tree.map((item) => item.id);

      if (!currentMenuKey) {
        this.$store.commit("home/SET_CURRENT_MENU", {
          data,
          tree,
        });
      }
    },
  },
  watch: {
    data: {
      handler(val) {
        initMenuMap(this.data, this.menuIdMap, "id");
        initMenuMap(this.data, this.menuLinkMap, "link");
        this.treeData = transformMenuData(this.data);
        this.$store.commit("home/SET_MENU_LINK_MAP", this.menuLinkMap);
        this.initMenu();
        const menuPaths = treeData2StorageData(this.data).flat(Infinity);
        sessionStorage.setItem("menuPaths", JSON.stringify(menuPaths));
      },
    },
    "$store.state.home.currentMenuKey": {
      handler() {
        this.initMenu();
      },
      deep: true,
      immediate: true,
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
  color: #546de5 !important;
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
  background: linear-gradient(to right, #546de5, #546de5) !important;
}
/** 选中菜单的背景颜色 */
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: rgba(84, 108, 229, 0.1) !important;
}
/** 选中菜单右侧边线的颜色 */
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  height: 50%;
  top: 25% !important;
  border-right: 3px solid #546de5 !important;
}
</style>
