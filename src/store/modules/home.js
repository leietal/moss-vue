import { logout, getUserInfo } from "@/services/home";

const defaultState = {
  // 当前登录用户信息
  userInfo: null,
  // 菜单展开或收缩
  menuCollapsed: false,
  // 当前菜单
  currentMenu: null,
  // 当前菜单key
  currentMenuKey: null,
  // 当前菜单树
  currentMenuTree: null,
  menuLiknMap: null,
};

export default {
  namespaced: true,
  state: {
    ...defaultState,
  },
  getters: {
    getPageComponents: (state) => (path) => {
      let menu = state.menuLiknMap.get(path);
      let array =
        (menu && menu.components.map((item) => [item.code, item])) || [];
      return new Map(array);
    },
  },
  mutations: {
    // 重置所有信息
    RESET_STATE(state) {
      for (let key in state) {
        state[key] = defaultState[key];
      }
    },
    // 设置返回结果
    SET_USER_INFO(state, data) {
      state.userInfo = data;
    },
    // 清除用户信息
    REMOVE_USER_INFO(state) {
      state.userInfo = null;
    },
    // 设置菜单展开收缩
    SET_MENU_COLLAPSED(state, data) {
      state.menuCollapsed = data;
    },
    SET_CURRENT_MENU(state, { data, tree }) {
      state.currentMenu = data;
      state.currentMenuKey = data.id;
      state.currentMenuTree = tree;
    },
    SET_MENU_LINK_MAP(state, data) {
      state.menuLiknMap = data;
    },
  },
  actions: {
    // 登出
    logout({ commit }) {
      return logout().then((res) => {
        commit("RESET_STATE");
        return res;
      });
    },
    // 获取当前登录用户信息
    getUserInfo({ state, commit }) {
      if (state.userInfo) {
        return Promise.resolve(state.userInfo);
      }
      return getUserInfo().then(({ data }) => {
        commit("SET_USER_INFO", data);
        return data;
      });
    },
  },
};
