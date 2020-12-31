import http from "@/utils/http";

const api = {
  // 创建
  create_content: "/content/create",
  // 修改
  modify_content: "/content/modify",
  // 删除
  remove_content: "/content/remove",
  // 获取单个
  find_content: "/content/find",
  // 获取列表
  page_content: "/content/page",
};

/**
 * 保存或修改数据
 * @param {Object} params
 */
export function createContent(data) {
  return http.post(api.create_content, data);
}

/**
 * 保存或修改数据
 * @param {Object} params
 */
export function modifyContent(data) {
  return http.put(api.modify_content, data);
}

/**
 * 保存或修改数据
 * @param {Number} id
 */
export function removeContent(id) {
  return http.delete(`${api.remove_content}/${id}`);
}

/**
 * 获取明细
 * @param {Number} id
 */
export function findContent(id) {
  return http.get(`${api.find_content}/${id}`);
}

/**
 * 获取列表
 * @param {Object} params
 */
export function pageContent(params) {
  return http.get(api.page_content, { params });
}
