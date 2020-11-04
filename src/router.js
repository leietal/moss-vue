import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const A = () => import("@/views/demo/A");
const B = () => import("@/views/demo/B");
const C = () => import("@/views/demo/C");
const DetailA = () => import("@/views/demo/DetailA");
const DetailB = () => import("@/views/demo/DetailB");
const DetailC = () => import("@/views/demo/DetailC");
const Chart = () => import("@/views/demo/Chart");

const Index = () => import("@/views/Index");
const Login = () => import("@/views/Login");
const Demo1 = () => import("@/views/Demo1");
const Form = () => import("@/views/Form");
const FormModel = () => import("@/views/FormModel");
const Test = () => import("@/views/Test");
const Table = () => import("@/views/Table");
const Table2 = () => import("@/views/Table2");

// 重写原始的push方法，避免push一个跟当前一样的路径时后台会报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes: [
    {
      path: "/demo1",
      component: Demo1,
      name: "demo1",
      meta: {
        title: "登录",
      },
    },
    {
      path: "/login",
      component: Login,
      name: "login",
      meta: {
        title: "登录",
      },
    },
    {
      path: "/",
      component: Index,
      name: "index",
      meta: {
        title: "首页",
      },
      children: [
        {
          path: "/a",
          component: A,
          name: "a",
          meta: {
            title: "列表A",
          },
        },
        {
          path: "/a/detail/:id",
          component: DetailA,
          name: "a_detail",
          meta: {
            title: "明细A",
          },
        },
        {
          path: "/b",
          component: B,
          name: "b",
          meta: {
            title: "列表B",
          },
        },
        {
          path: "/b/detail/:id",
          component: DetailB,
          name: "b_detail",
          meta: {
            title: "明细B",
          },
        },
        {
          path: "/c",
          component: C,
          name: "c",
          meta: {
            title: "列表C",
          },
        },
        {
          path: "/c/detail/:id",
          component: DetailC,
          name: "c_detail",
          meta: {
            title: "明细C",
          },
        },
        {
          path: "/chart",
          component: Chart,
          name: "chart",
          meta: {
            title: "图表",
          },
        },
        {
          path: "/form",
          component: Form,
          name: "form",
          meta: {
            title: "Form",
          },
        },
        {
          path: "/form_model",
          component: FormModel,
          name: "form_model",
          meta: {
            title: "FormModel",
          },
        },
        {
          path: "/test",
          component: Test,
          name: "test",
          meta: {
            title: "Test",
          },
        },
        {
          path: "/test/:type",
          component: Test,
          name: "test2",
          meta: {
            title: "Test2222",
          },
        },
        {
          path: "/table",
          component: Table,
          name: "table",
          meta: {
            title: "table",
          },
        },
        {
          path: "/table2",
          component: Table2,
          name: "table2",
          meta: {
            title: "table2",
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
