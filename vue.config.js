const CompressionPlugin = require("compression-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const API_URL = "10.20.30.165:8082";

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: "8080", //代理端口
    open: false, //项目启动时是否自动打开浏览器
    proxy: {
      "/api": {
        //代理api
        target: "http://" + API_URL, //服务器api地址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "", //重写路径
        },
      },
      "/websocket": {
        target: "ws://" + API_URL,
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
      },
    },
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // 主题色配置
          modifyVars: {
            "primary-color": "#6c63ff", // 全局主色
            "link-color": "#6c63ff", // 链接色
            "success-color": "#52c41a", // 成功色
            "warning-color": "#faad14", // 警告色
            "error-color": "#f5222d", // 错误色
            "font-size-base": "14px", // 主字号
            "heading-color": "rgba(0, 0, 0, 0.85)", // 标题色
            "text-color": "rgba(0, 0, 0, 0.65)", // 主文本色
            "text-color-secondary": "rgba(0, 0, 0, 0.45)", // 次文本色
            "disabled-color": "rgba(0, 0, 0, 0.25)", // 失效色
            "border-radius-base": "2px", // 组件/浮层圆角
            "border-color-base": "#d9d9d9", // 边框色
            "box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)", // 浮层阴影
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== "dev") {
      // 包文件大小看板
      config.plugin("bundleAnalyzer").use(
        new BundleAnalyzerPlugin({
          analyzerMode: "disabled", // 默认关闭
        })
      );

      // 文件压缩
      config
        .plugin("compression")
        .use(CompressionPlugin, {
          test: /\.(js|css)?$/i, // 哪些文件要压缩
          filename: "[path].gz[query]", // 压缩后的文件名
          algorithm: "gzip", // 使用gzip压缩
          minRatio: 0.8, // 压缩率小于0.8才会压缩
          deleteOriginalAssets: false, // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
        })
        .tap((args) => {});

      // 排除npm依赖项目
      config.externals({
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        "ant-design-vue": "antd",
        axios: "axios",
        moment: "moment",
        "ant-design-vue/dist/antd.min.css": "antd",
      });

      // 使用cdn依赖项目
      config
        .plugin("cdn")
        .use(
          new WebpackCdnPlugin({
            crossOrigin: "anonymous",
            prodUrl: "//unpkg.zhimg.com/:name@:version/:path",
            modules: {
              vue: [
                {
                  name: "vue",
                  var: "Vue",
                  path: "dist/vue.runtime.min.js",
                },
                {
                  name: "vue-router",
                  var: "VueRouter",
                  path: "dist/vue-router.min.js",
                },
                {
                  name: "vuex",
                  var: "Vuex",
                  path: "dist/vuex.min.js",
                },
                {
                  name: "axios",
                  var: "axios",
                  path: "dist/axios.min.js",
                },
                {
                  name: "moment",
                  var: "moment",
                  paths: ["min/moment.min.js", "min/locales.min.js"],
                },
                {
                  name: "ant-design-vue",
                  var: "antd",
                  paths: ["dist/antd.min.js", "dist/antd-with-locales.min.js"],
                  style: "dist/antd.min.css",
                },
              ],
            },
          })
        )
        .tap((args) => {});
    }
  },
};
