<template>
  <a-config-provider :locale="zh_CN">
    <router-view />
  </a-config-provider>
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
  min-width: 1024px;
}
button,
input,
input:focus,
input:hover {
  outline: none !important;
}
a {
  text-decoration: none;
}
/* -------------- 表单 -------------- */
.ant-form-item {
  margin-bottom: 6px !important;
}
/* -------------- 表格 -------------- */
.ant-table-thead {
  background-color: #f1f1f1;
}
.ant-table-row:nth-child(even) {
  background-color: #f8f8f8;
}
.ant-table-row:nth-child(odd) {
  background-color: #fff;
}
.ant-table .ant-table-body {
  margin: 0 !important;
}
.ant-btn:not(:last-child) {
  margin-right: 5px;
}
.ant-table-pagination.ant-pagination {
  margin: 10px auto !important;
}
/* -------------- 弹窗 -------------- */
.ant-modal-body {
  padding: 15px !important;
}
.ant-modal-footer {
  text-align: center !important;
}
/* -------------- tabs -------------- */
.ant-tabs .ant-tabs-bar {
  margin: 0 !important;
}
.ant-tabs .ant-tabs-tab-prev {
  box-shadow: 2px 0 4px #ccc !important;
  z-index: 9;
}
.ant-tabs .ant-tabs-tab-next {
  box-shadow: -2px 0 4px #ccc !important;
  z-index: 9;
  right: 0;
}
.ant-tabs .ant-tabs-tab-btn-disabled {
  box-shadow: none !important;
}
.ant-tabs .ant-tabs-tab:first-child {
  margin-left: 3px !important;
}
.ant-tabs .ant-tabs-tab:last-child {
  margin-right: 3px !important;
}
/* -------------- 卡片 -------------- */
.ant-card {
  border-color: #e8e8e8;
}
.ant-card-body {
  padding: 10px;
}
/* -------------- 其他 -------------- */
.ant-calendar-picker {
  width: 100%;
}
.ant-tag:last-child {
  margin-right: 0 !important;
}
.ant-form-item,
.ant-form-vertical .ant-form-item {
  margin-bottom: 10px !important;
  padding-bottom: 0px !important;
}
.ant-form-item-label {
  padding: 0 0 4px !important;
}
.ant-modal-confirm .ant-modal-confirm-btns {
  float: none !important;
  text-align: center;
}
.ant-dropdown-menu-item .anticon {
  margin-right: 10px;
  color: #bbb;
}
.container {
  padding: 10px;
  box-sizing: border-box;
}
.form-action-bar {
  text-align: center;
}
.container > :not(:last-child) {
  margin-bottom: 10px;
}
/* -------------- 字体 -------------- */
@font-face {
  font-family: AntonioLight;
  src: url("~@/assets/Antonio-Light.ttf");
}
@font-face {
  font-family: AntonioBold;
  src: url("~@/assets/Antonio-Bold.ttf");
}
@font-face {
  font-family: Antonio;
  src: url("~@/assets/Antonio-Regular.ttf");
}
</style>