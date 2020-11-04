export default {
  namespaced: true,
  state: {
    loginUser: null,
    menuCollapsed: false,

    // 菜单集合
    menuList: null,
    // tab集合
    tabMap: new Map(),
    // 当前激活的tab {String:key}
    tabActive: null,
    // 最后一个tab {String:key}
    tabLast: null,
    // tabPath: new Map(),
    tabDeleteNum: 0,
  },
  getters: {},
  mutations: {
    SET_LOGIN_USER(state, data) {
      state.loginUser = data;
    },
    SET_MENU_COLLAPSED(state, data) {
      state.menuCollapsed = data;
    },
    INIT_MENU_LIST(state, data) {
      state.menuList = data;
    },
    INIT_MENU_MAP(state, data) {
      state.menuMap = data;
    },
    INIT_MENU_PATH_MAP(state, data) {
      state.menuPathMap = data;
    },
    OPEN_TAB(state, menu) {
      // 设置当前打开的tab
      const { key } = menu;
      if (!state.tabMap.has(key)) {
        // ====== 添加tab ======
        // 设置最后一个菜单的last为新的菜单
        let _last = null;
        if (state.tabLast) {
          _last = state.tabMap.get(state.tabLast);
          _last.last = key;
        }
        menu.prev = _last && _last.key;
        // 设置新的tab为last
        state.tabLast = key;
      }
      state.tabMap.set(key, { ...state.tabMap.get(key), ...menu });
      state.tabActive = key;
    },
    // 移除菜单
    CLOSE_TAB(state, key) {
      let tab = state.tabMap.get(key);
      // 如果关闭的是当前选中的key，则选中上一个或者下一个
      if (key === state.tabActive) {
        let _prev = state.tabMap.get(tab.prev);
        if (_prev) {
          _prev.last = tab.last;
        }

        let _last = state.tabMap.get(tab.last);
        if (_last) {
          _last.prev = tab.prev;
        }
        state.tabActive = tab.prev || tab.last;
      }
      // 如果关闭的是最后一个，last tab则更新为前面一个
      if (key === state.tabLast) {
        state.tabLast = tab.prev;
      }
      // 删除key
      state.tabMap.delete(key);
      state.tabDeleteNum++;
    },
  },
  actions: {},
};
