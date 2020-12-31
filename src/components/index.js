import XsDownload from "@/views/components/XsDownload";
import XsUpload from "@/views/components/XsUpload";
import XsFilePreview from "@/views/components/XsFilePreview";
import XsRangePicker from "@/views/components/XsRangePicker";

function plugins(Vue) {
  // 下载组件
  Vue.component("xs-download", XsDownload);
  // 上传组件
  Vue.component("xs-upload", XsUpload);
  // 文件预览组件
  Vue.component("xs-file-preview", XsFilePreview);
  // 日期控件
  Vue.component("xs-range-picker", XsRangePicker);
}

export default plugins;
