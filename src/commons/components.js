// 下载组件
// import XsDownload from "@/components/XsDownload";
// grid中“是否”组件
// import XsSwitch from "@/views/components/XsSwitch";
// 日期控件
import XsRangePicker from "@/views/XsRangePicker.vue";

function plugins(Vue) {
  // Vue.component("xs-download", XsDownload);
  // Vue.component("xs-switch", XsSwitch);
  Vue.component("xs-range-picker", XsRangePicker);
}

export default plugins;
