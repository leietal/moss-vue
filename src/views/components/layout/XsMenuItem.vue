<template functional>
  <a-sub-menu :key="props.menuInfo.id">
    <span slot="title">
      <a-icon :type="props.menuInfo.icon" v-if="props.menuInfo.icon" />
      <span>{{ props.menuInfo.name }}</span>
    </span>

    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children || !item.children.length"
        :key="item.id"
      >
        <a-icon :type="item.icon" v-if="item.icon" />
        <span>{{ item.name }}</span>
      </a-menu-item>

      <xs-menu-item v-else :menuInfo="item" :key="item.id" />
    </template>
  </a-sub-menu>
</template>