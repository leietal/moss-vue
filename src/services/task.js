import http from "@/commons/http";

const api = {
  query_task_front: "/anon/task/front_list",
};

export function queryTaskFront(params) {
  return http.get(api.query_task_front, { params });
}
