<template>
  <a-result status="403" title="权限不足" sub-title="您没有访问该页面的权限.">
    <template #extra>
      <a-button type="primary" icon="arrow-left" @click="$router.replace('/')"
        >返回首页</a-button
      >
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

