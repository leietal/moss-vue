export default {
  namespaced: true,
  state: {
    loginUser: null,
    menuCollapsed: false,
  },
  getters: {},
  mutations: {
    SET_LOGIN_USER(state, data) {
      state.loginUser = data;
    },
    SET_MENU_COLLAPSED(state, data) {
      state.menuCollapsed = data;
    },
  },
  actions: {},
};
