export default {
  namespaced: true,
  state: {
    // 登录用户信息
    loginUser: null,
  },
  getters: {},
  mutations: {
    SET_USER(state, data) {
      state.loginUser = data;
    },
  },
  actions: {},
};
