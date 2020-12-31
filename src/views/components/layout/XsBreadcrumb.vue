<template>
  <a-breadcrumb class="xs-breadcrumb">
    <a-breadcrumb-item>
      <router-link to="/home">主页</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="(item, i) in openMenu" :key="i">
      <span v-if="!item.link">{{ item.name }}</span>
      <router-link :to="item.link" v-else>{{ item.name }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  computed: {
    openMenu() {
      const tree = this.$store.state.home.currentMenuTree;
      return tree && tree.reverse();
    },
    notInMenu() {
      // 当前路由的路径与当前选中菜单路径不一致则表示不在左侧菜单范围中，即最后一级可点
      return false;
    },
  },
};
</script>

<style scoped>
.xs-breadcrumb.ant-breadcrumb > span:last-child {
  color: #fff;
}
.xs-breadcrumb.ant-breadcrumb-link,
.xs-breadcrumb.ant-breadcrumb,
.xs-breadcrumb.ant-breadcrumb a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
}
.xs-breadcrumb.ant-breadcrumb a:hover {
  color: #fff;
}
</style>

<style>
.xs-breadcrumb .ant-breadcrumb-separator {
  color: rgba(255, 255, 255, 0.3);
}
</style>