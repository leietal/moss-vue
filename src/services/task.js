import http from "@/commons/http";

const api = {
  queryTask: "/anon/task/list",
};

export function queryTask(params) {
  return http.get(api.queryTask, { params });
}
