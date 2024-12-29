export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user", //menu cha
    menus: [
      {
        name: "menu.admin.crud",  //menu con
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
  {
    //quản lý phòng khám
    name: "menu.admin.clinic",  //menu cha
    menus: [
      {
        name: "menu.admin.manage-clinic", //menu con
        link: "/system/manage-clinic",
      },
    ],
  },

  {
    //quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },

  {
    //quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
