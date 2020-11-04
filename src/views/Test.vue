<template>
  <div class="container">
    <h1>hello {{ $route.query.id }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
