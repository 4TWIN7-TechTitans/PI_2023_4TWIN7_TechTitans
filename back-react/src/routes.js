/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Landing from "views/examples/Landing.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import ListOfUsers from "views/examples/ListOfUsers.js";
import Icons from "views/examples/Icons.js";
import NotFound from "views/examples/error";
import AddNew from "views/examples/add";
import ResetPass from "views/examples/resetPass";
import ForgetPass from "views/examples/forgetPass";
import AddNewContract from "views/examples/addContract";
import addcar from "views/examples/addCar";
import AddStatement from "views/examples/addStatement";
import ViewProfile from "views/examples/ViewProfile";
import Tickets from "views/examples/Tickets";
var routes = [
  //TODO : change admin to user view profile
  {
    path: "/view-user-profile",
    name: "User Profile",
    icon: "ni ni-tv-2 text-primary",
    component: ViewProfile,
    layout: "/main",
    showInSidebar: true,
  },
  {
    path: "/index",
    name: "Welcome",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/main",
    showInSidebar: false,
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/listofusers",
    name: "List Of Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: ListOfUsers,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/add",
    name: "Add new user",
    icon: "ni ni-circle-08 text-green",
    component: AddNew,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/error",
    name: "Something wrong !",
    icon: "ni ni-fat-remove text-red",
    component: NotFound,
    layout: "/auth",
    showInSidebar: false
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    showInSidebar: false,
  },
  {
    path: "/loginpro",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    showInSidebar: false,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    showInSidebar: false,
  },
  {
    path: "/forgetpwd",
    name: "Forget Password",
    icon: "ni ni ni-key-25 text-red",
    component: ForgetPass,
    layout: "/auth",
    showInSidebar: false,
  },
  {
    path: "/resetpwd",
    name: "Reset Password",
    icon: "ni ni ni-key-25 text-yellow",
    component: ResetPass,
    layout: "/auth",
    showInSidebar: true,
  },
  {
    path: "/addcontract",
    name: "Add New Contract",
    icon: "ni ni-fat-add text-black",
    component: AddNewContract,
    layout: "/agence",
    showInSidebar: true,
  },
  {
      path: "/addcar",
      name: "Add Your Car",
      icon: "ni ni-bus-front-12 text-primary",
      component: addcar,
      layout: "/main",
      showInSidebar: true,
    },
    {
      path: "/addstatement",
      name: "Add a Statement",
      icon: "ni ni-collection text-red",
      component: AddStatement,
      layout: "/main",
      showInSidebar: true,
    },
    {
      path: "/landing",
      name: "Add a Statement",
      icon: "ni ni-collection text-red",
      component: Landing,
      layout: "/landing",
      showInSidebar: true,
    }
    
];
export default routes;
