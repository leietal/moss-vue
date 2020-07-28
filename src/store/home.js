export default {
  namespaced: true,
  state: {
    // 当前打开页面
    menu: null,
  },
  getters: {},
  mutations: {
    SET_MENU(state, data) {
      state.menu = data;
    },
  },
  actions: {},
};
