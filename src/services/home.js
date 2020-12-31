import http from "@/utils/http";
import qs from "qs";

const MethodType = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PUT: "PUT",
};

const ContentType = {
  MULTIPART_FORM_DATA: {
    "content-type": "multipart/form-data",
  },
  APPLICATION_FORM_URLENCODED: {
    "content-type": "application/x-www-form-urlencoded",
  },
};

const api = {
  // 登录
  login: "/login",
  // 登出
  logout: "/logout",
  // 获取当前登录用户
  get_user_info: "/anon/user/info",
  // 获取当前用户的资源列表
  query_resource_list: "/resource/list",
};

/**
 * 登录
 * @param {Object} data
 */
export function login(data = {}) {
  const opts = {
    method: MethodType.POST,
    url: api.login,
    headers: { ...ContentType.APPLICATION_FORM_URLENCODED },
    data: qs.stringify(data),
  };
  return http(opts);
}

/**
 * 登出
 */
export function logout() {
  return http.post(api.logout);
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return http.get(api.get_user_info);
}

/**
 * 查询登录用户菜单资源
 * @param {Object} params
 */
export function queryResourceList(params = {}) {
  return http.get(api.query_resource_list, { params });
}
