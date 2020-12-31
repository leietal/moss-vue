import Vue from "vue";
import vuex from "vuex";
import home from "./modules/home";
Vue.use(vuex);

export default new vuex.Store({
  modules: {
    home,
  },
});
