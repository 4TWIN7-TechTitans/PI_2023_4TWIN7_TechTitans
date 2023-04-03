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
import Maps from "views/examples/Maps.js";
import Tables from "views/examples/Tables.js";
import ListOfUsers from "views/examples/ListOfUsers.js";
import Icons from "views/examples/Icons.js";
import AddNew from "views/examples/add";
import Tickets from "views/examples/Tickets";
var routesAdmin = [
  //TODO : change admin to user view profile

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
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-bullet-list-67 text-blue",
    component: Tickets,
    layout: "/admin",
    showInSidebar: true,
  },

];
export default routesAdmin;
