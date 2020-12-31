// 文件压缩
const CompressionPlugin = require("compression-webpack-plugin");
//  js库 cdn插件
const WebpackCdnPlugin = require("webpack-cdn-plugin");
// 打包大小分析
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const url = "//localhost:8086/";

module.exports = {
  outputDir: "moss-vue",
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: "8080", //代理端口
    open: false, //项目启动时是否自动打开浏览器
    proxy: {
      "/api": {
        //代理api
        target: `http:${url}`, //服务器api地址
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          //重写路径
          "^/api": "",
        },
      },
      "/websocket": {
        target: `ws:${url}`,
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
        pathRewrite: {},
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
          modifyVars: {
            "primary-color": "#546de5", // 全局主色
            // "link-color": "#2ecc71", // 链接色
            // "success-color": "#1dd1a1", // 成功色
            // "warning-color": "#feca57", // 警告色
            // "error-color": "#ee5253", // 错误色
            // "font-size-base": "14px", // 主字号
            // "heading-color": "rgba(0, 0, 0, 0.85)", // 标题色
            // "text-color": "rgba(0, 0, 0, 0.65)", // 主文本色
            // "text-color-secondary": "rgba(0, 0, 0, 0.45)", // 次文本色
            // "disabled-color": "rgba(0, 0, 0, 0.25)", // 失效色
            "border-radius-base": "2px", // 组件/浮层圆角
            // "border-color-base": "#d9d9d9", // 边框色
            // "box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)", // 浮层阴影
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== "dev") {
      config.plugin("bundleAnalyzer").use(
        new BundleAnalyzerPlugin({
          analyzerMode: "disabled",
        })
      );

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

      config.externals({
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        "ant-design-vue": "antd",
        axios: "axios",
        moment: "moment",
        // "vue-quill-editor": "vue-quill-editor",
        "ant-design-vue/dist/antd.min.css": "antd",
      });

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
                // {
                //   name: "vue-quill-editor",
                //   var: "VueQuillEditor",
                //   paths: ["dist/vue-quill-editor.js"],
                // },
              ],
            },
          })
        )
        .tap((args) => {});
    }
  },
};
