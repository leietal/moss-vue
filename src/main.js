import Vue from "vue";
import App from "@/App.vue";
// 引入 ant design
import Antd from "ant-design-vue";
// 引入 ant design 样式
import "ant-design-vue/dist/antd.less";
// 引入 vuex
import store from "@/store";
// 引入 路由
import router from "@/router";
// 引入 过滤器
import filters from "@/filters";
// 全局组件
import components from "@/components";

Vue.config.productionTip = false;
// Vue.config.silent = true;

Vue.use(Antd);
Vue.use(components);

// 添加全局的过滤器
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
