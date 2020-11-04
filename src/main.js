import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import ViserVue from "viser-vue";
import "ant-design-vue/dist/antd.less";
import router from "./router";
import store from "./store";
// 全局组件
import components from "./commons/components";

Vue.use(Antd);
Vue.use(ViserVue);
Vue.use(components);

Vue.directive("hello", {
  bind: function(el, binding, vnode) {
    // el.innerHTML = binding.value;
  },
  inserted: function(el, binding, vnode) {},
  update: function() {},
  componentUpdated: function() {},
  unbind: function() {},
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
