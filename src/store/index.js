import Vue from "vue";
import Vuex from "vuex";
import home from "@/store/home";
import dict from "@/store/dict";

Vue.use(Vuex);

const vuex = new Vuex.Store({
  modules: {
    home,
    dict,
  },
});

export default vuex;
