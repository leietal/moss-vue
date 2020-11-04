import Vue from "vue";
import Vuex from "vuex";
import home from "@/store/home";

Vue.use(Vuex);

const vuex = new Vuex.Store({
  modules: {
    home,
  },
});

export default vuex;
