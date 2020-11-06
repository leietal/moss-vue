import Vue from "vue";
import App from "./App.vue";
// UI框架
import Antd from "ant-design-vue";
// 图表插件
import ViserVue from "viser-vue";
// UI框架主题
import "ant-design-vue/dist/antd.less";
// 路由
import router from "./router";
// 状态管理器
import store from "./store";
// 全局组件
import components from "./commons/components";

Vue.use(Antd);
Vue.use(ViserVue);
Vue.use(components);

Vue.prototype.getDicts = async function(dictCodes) {
  if (!dictCodes) {
    return;
  }
  // 加载数据
  this.$store.dispatch("dict/getDicts", dictCodes).then((data) => {
    if (!data) {
      return;
    }
    for (const [key, value] of Object.entries(data)) {
      this.$data[key] = value;
    }
  });
};

Vue.filter("getDictLabel", (val, list) => {
  if (!val || !list || !list.length) {
    return "";
  }
  let obj = list.find((item) => item.value === val);
  return (obj && obj.label) || "";
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
