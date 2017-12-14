import Admin from "@/components/Admin";
import Authority from "@/components/admin-blocks/admin-auth";
import UserCenter from "@/components/admin-blocks/user-center";

export const adminRouter = {
  path: "/admin",
  name: "admin",
  title: "首页",
  meta: { requiresAuth: true },
  component: Admin,
  children: [
    {
      path: "auth",
      name: "auth",
      icon: "key",
      title: "权限管理",
      component: Authority
    }, {
      path: "user",
      name: "userCenter",
      title: "用户中心",
      component: UserCenter
    }
  ]
};
