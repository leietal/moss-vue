<template>
  <div id="app">
    <a-config-provider :locale="zh_CN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  data() {
    return {
      zh_CN,
    };
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.ant-table-row:nth-child(even) {
  background-color: rgba(100, 50, 209, 0.05);
}
.ant-table-small .ant-table-body {
  margin: 0 !important;
}
.ant-btn:not(:last-child) {
  margin-right: 5px;
}
.ant-table-pagination.ant-pagination {
  margin: 10px auto auto auto !important;
}
button:not(:last-child) {
  margin-right: 5px;
}
.ant-card:not(:last-child) {
  margin-bottom: 10px;
}
.ant-tabs .ant-tabs-bar {
  margin: 0 !important;
}
.ant-tabs .ant-tabs-tabpane {
  padding: 10px;
  min-height: 100%;
  box-sizing: border-box;
}
.ant-card {
  border-color: #e8e8e8;
}
.ant-card-body {
  padding: 10px;
}
.ant-table-thead {
  background-color: #f2f2f2;
}
.ant-form-item {
  margin-bottom: 30px !important;
  padding-bottom: 0 !important;
}
.ant-form-item-label {
  padding: 0 0 4px !important;
}
.container {
  padding: 15px;
  box-sizing: border-box;
}
.container .header {
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
  margin: -15px;
  margin-bottom: 15px;
}
</style>
