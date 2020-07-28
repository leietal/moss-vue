import Vue from "vue";
import Vuex from "vuex";
import home from "@/store/home";
import user from "@/store/user";

Vue.use(Vuex);

const vuex = new Vuex.Store({
  modules: {
    home,
    user,
  },
});

export default vuex;
