import Admin from "@/components/Admin";
import Authority from "@/components/Authority";

export const adminRouter = {
  path: "/admin",
  name: "admin",
  meta: { requiresAuth: true },
  component: Admin,
  children: [
    {
      path: "auth",
      name: "auth",
      component: Authority
    }
  ]
};
