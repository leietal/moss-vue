import http from "@/utils/http";

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
  // 上传文件
  upload_file: "/anon/file/upload",
  // 下载文件
  download_file: "/anon/file/download",
};

/**
 * 附件信息上传
 * @param {Object} data
 */
export function uploadFile(data) {
  let param = new FormData();
  param.append("file", data);
  const opts = {
    method: MethodType.POST,
    headers: { ...ContentType.MULTIPART_FORM_DATA },
    data: param,
  };
  return http(api.upload_file, opts);
}

/**
 * 组织下载链接
 * @param {String} code
 */
export function getDownloadUrl(code) {
  if (!code) {
    return;
  }
  return (
    `${process.env.VUE_APP_URL}${api.download_file}/${code}?time=` + Date.now()
  );
}

export const editorImageExtend = {
  loading: true, // 可选参数 是否显示上传进度和提示语
  name: "file", // 图片参数名
  size: 10, // 文件大小，单位 M
  action: `${process.env.VUE_APP_URL + api.upload_file}`, // 服务器地址, 如果action为空，则采用base64插入图片
  response({ data }) {
    console.log("response------->", data, arguments);
    return data && getDownloadUrl(data.fileCode);
  },
  sizeError() {
    // 可选参数 自定义网络错误触发的事件
    console.error("🧨 文件大小出错", arguments);
    document.querySelector(".quill-message").click();
  },
  headers(xhr) {
    console.log("🔨 设置header", arguments);
  },
  start() {
    // 可选参数 自定义开始上传触发事件
    console.log("📤 开始上传文件...", arguments);
  },
  end() {
    // 可选参数 自定义上传结束触发的事件，无论成功或者失败
    console.log("📬 文件上传完成", arguments);
  },
  success() {
    // 可选参数 自定义网络错误触发的事件
    console.info("🥳 文件上传成功", arguments);
  },
  error() {
    // 可选参数 自定义网络错误触发的事件
    console.error("😫 文件上传失败", arguments);
  },
  change(xhr, formData) {
    // 可选参数 选择文件
    console.log("⌛️ 选择文件", arguments);
  },
};
