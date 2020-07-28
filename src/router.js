import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Demo = () => import("@/views/Demo");

// 重写原始的push方法，避免push一个跟当前一样的路径时后台会报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes: [
    {
      path: "/demo2",
      component: Demo,
      name: "demo2",
      meta: {
        title: "demo2",
      },
    },
    {
      path: "/demo3",
      component: Demo,
      name: "demo3",
      meta: {
        title: "demo3",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
