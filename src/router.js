import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Index = () => import("@/views/Index");
const Login = () => import("@/views/Login");
const Chart = () => import("@/views/chart/Chart");
const Form = () => import("@/views/form/Form");
const FormModel = () => import("@/views/form/FormModel");
const Table = () => import("@/views/table/Table");
const Table2 = () => import("@/views/table/Table2");
const FruitsDropdown = () => import("@/views/model/DropdownDemo");

// 重写原始的push方法，避免push一个跟当前一样的路径时后台会报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes: [
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
          path: "/fruits_dropdown",
          component: FruitsDropdown,
          name: "fruits_dropdown",
          meta: {
            title: "FruitsDropdown",
          },
        },
        {
          path: "/table",
          component: Table,
          name: "table",
          meta: {
            title: "Table",
          },
        },
        {
          path: "/table2",
          component: Table2,
          name: "table2",
          meta: {
            title: "Table2",
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
