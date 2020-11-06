export const menuList = [
  // {
  //   id: 2,
  //   name: "图表看板",
  //   link: "/chart",
  //   icon: "edit",
  //   visible: true,
  // },
  {
    id: 3,
    name: "下拉框",
    link: "/fruits_dropdown",
    icon: "edit",
    visible: true,
  },
  {
    id: 1,
    name: "表单",
    link: "",
    icon: "bank",
    visible: true,
    children: [
      {
        id: 11,
        name: "表单-Form",
        link: "/form",
        icon: "bank",
        visible: true,
      },
      {
        id: 12,
        name: "表单-FormModel",
        link: "/form_model",
        icon: "bank",
        visible: true,
      },
    ],
  },
  {
    id: 9,
    name: "表格",
    link: "",
    icon: "bank",
    visible: true,
    children: [
      {
        id: 91,
        name: "表格1",
        link: "/table",
        icon: "bank",
        visible: true,
      },
      {
        id: 92,
        name: "表格2",
        link: "/table2",
        icon: "bank",
        visible: true,
      },
    ],
  },
];
