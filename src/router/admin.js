import Admin from "@/components/Admin";
import AdminHome from "@/components/admin-blocks/admin-home";
import Authority from "@/components/admin-blocks/admin-auth";
import UserCenter from "@/components/admin-blocks/user-center";
import dragableTable from "@/components/table-blocks/dragable-table";
import editableTable from "@/components/table-blocks/editable-table";
import searchableTable from "@/components/table-blocks/searchable-table";
import composeForm from "@/components/form-blocks/compose-form";
import swapForm from "@/components/form-blocks/swap-form";
import imageEdit from "@/components/component-blocks/image-edit";
import uploadFile from "@/components/component-blocks/upload";

export const adminRouter = [{
  path: "/admin",
  title: "首页",
  meta: { requiresAuth: true },
  component: Admin,
  children: [
    {
      path: "",
      name: "admin",
      component: AdminHome
    }, {
      path: "authority",
      name: "authority",
      icon: 'key',
      title: "权限管理",
      component: Authority
    }, {
      path: "userCenter",
      name: "userCenter",
      title: "用户中心",
      component: UserCenter
    }
  ]
}, {
  path: "/tables",
  name: "tables",
  title: "表格管理",
  meta: { requiresAuth: true },
  component: Admin,
  children: [
    {
      path: "dragTab",
      name: "dragTab",
      icon: "arrow-move",
      title: "可拖拽排序表格",
      component: dragableTable
    }, {
      path: "editTab",
      name: "editTab",
      icon: "edit",
      title: "可编辑表格",
      component: editableTable
    }, {
      path: "searchTab",
      name: "searchTab",
      icon: "search",
      title: "可搜索表格",
      component: searchableTable
    }
  ]
}, {
  path: "/forms",
  name: "forms",
  title: "表单管理",
  meta: { requiresAuth: true },
  component: Admin,
  children: [
    {
      path: "composeForm",
      name: "composeForm",
      icon: "compose",
      title: "文章发布",
      component: composeForm
    }, {
      path: "swapForm",
      name: "swapForm",
      icon: "arrow-swap",
      title: "工作流",
      component: swapForm
    }
  ]
}, {
  path: "/comp",
  name: "component",
  title: "组件管理",
  meta: { requiresAuth: true },
  component: Admin,
  children: [
    {
      path: "imageEdit",
      name: "imageEdit",
      icon: "crop",
      title: "图片预览编辑",
      component: imageEdit
    }, {
      path: "uploadFile",
      name: "uploadFile",
      icon: "android-upload",
      title: "文件上传",
      component: uploadFile
    }
  ]
}];
