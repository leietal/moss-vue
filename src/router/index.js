import Vue from "vue";
import Router from "vue-router";

const Index = () => import("@/views/Index");
const Home = () => import("@/views/Home");
const Login = () => import("@/views/Login");
const NoPermission = () => import("@/views/NoPermission");
const Content = () => import("@/views/content/Content");
const ContentDetail = () => import("@/views/content/ContentDetail");
const MessageConfig = () => import("@/views/message/MessageConfig");
const MessageConfigDetail = () => import("@/views/message/MessageConfigDetail");
const MessageList = () => import("@/views/message/MessageList");
const ExcelConfig = () => import("@/views/excel/ExcelConfig");
const ExcelConfigDetail = () => import("@/views/excel/ExcelConfigDetail");
const ExcelImport = () => import("@/views/excel/ExcelImport");
const ExcelImportDetail = () => import("@/views/excel/ExcelImportDetail");

Vue.use(Router);

// 重写原始的push方法，避免push一个跟当前一样的路径时后台会报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        anonymous: true,
        title: "登录",
      },
    },
    {
      path: "/",
      name: "index",
      component: Index,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: Home,
          meta: {
            authorized: true,
            title: "首页",
          },
        },
        {
          path: "/no_permission",
          name: "no_permission",
          component: NoPermission,
          meta: {
            authorized: true,
            title: "无权访问",
          },
        },
        {
          path: "/message_config",
          name: "message_config",
          component: MessageConfig,
          meta: {
            anonymous: true,
            title: "内容管理",
          },
        },
        {
          path: "/message_config/detail",
          name: "message_config_detail",
          component: MessageConfigDetail,
          meta: {
            anonymous: true,
            title: "内容管理",
          },
        },
        {
          path: "/message_list",
          name: "message_list",
          component: MessageList,
          meta: {
            anonymous: true,
            title: "内容管理",
          },
        },
        {
          path: "/excel_config",
          name: "excel_config",
          component: ExcelConfig,
          meta: {
            anonymous: true,
            title: "内容管理",
          },
        },
        {
          path: "/excel_config/detail",
          name: "excel_config_detail",
          component: ExcelConfigDetail,
          meta: {
            anonymous: true,
            title: "内容管理",
          },
        },
        {
          path: "/excel_import",
          name: "excel_import",
          component: ExcelImport,
          meta: {
            anonymous: true,
            title: "内容管理",
          },
        },
        {
          path: "/excel_import/detail",
          name: "excel_import_detail",
          component: ExcelImportDetail,
          meta: {
            anonymous: true,
            title: "内容管理",
          },
        },
        {
          path: "/content",
          name: "content",
          component: Content,
          meta: {
            title: "内容管理",
          },
        },
        {
          path: "/content_detail",
          name: "content_add",
          component: ContentDetail,
          meta: {
            title: "内容明细",
          },
          children: [
            {
              path: "/content_detail/:id",
              name: "content_detail",
              component: ContentDetail,
              meta: {
                title: "内容明细",
              },
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 非匿名的则需要判断是否已登录，未登录的则跳转至登录页面
  // anonymous 是否无需登录就可访问
  // if (!to.matched.some((record) => record.meta.anonymous)) {
  // TODO 用户是否已登录的校验
  // 权限判断
  // authorized  是否无需授权就可访问
  // if (to.meta.authorized) {
  //   next();
  //   return;
  // }
  // let menuPaths = sessionStorage.getItem("menuPaths");
  // let size = (to.matched.length && to.matched.length - 1) || 0;
  // let current = to.matched[size];
  // if (menuPaths && current && !JSON.parse(menuPaths).includes(current.path)) {
  //   next("/no_permission");
  //   return;
  // }
  // }
  next();
});

export default router;
