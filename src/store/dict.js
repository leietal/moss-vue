async function getDicts(dictCodes) {
  console.log("5---------");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user_status: [
          { value: 1, label: "苹果" },
          { value: 2, label: "西瓜" },
          { value: 3, label: "香蕉" },
        ],
        task_status: [
          { value: 1, label: "待审核" },
          { value: 2, label: "审核通过" },
          { value: 3, label: "审核未通过" },
        ],
      });
    }, 1000);
  });
}

export default {
  namespaced: true,
  state: {
    dict: {},
  },
  getters: {
    getLoaded: (state) => (dictCodes) => {
      console.log("9---------");
      let obj = {};
      dictCodes.forEach((item) => {
        obj[item] = state.dict[item];
      });
      return obj;
    },
    getNotLoaded: (state) => (dictCodes) => {
      console.log("2---------");
      return dictCodes.filter((item) => !state.dict[item]);
    },
  },
  mutations: {
    ADD_DICT: (state, data) => {
      console.log("6677---------");
      for (const [key, value] of Object.entries(data)) {
        state.dict[key] = value;
      }
    },
  },
  actions: {
    async getDicts({ state, commit, getters }, dictCodes) {
      console.log("1---------");
      // 获取未加载过的字典集合
      let unload = getters.getNotLoaded(dictCodes);
      console.log("3---------");
      // 请求后台加载数据
      if (unload && unload.length) {
        console.log("4---------");
        await getDicts(unload).then((data) => {
          console.log("6---------", data);
          commit("ADD_DICT", data);
        });
        console.log("7---------");
      }
      console.log("8---------");
      // 返回state里的数据
      return getters.getLoaded(dictCodes);
    },
  },
};
