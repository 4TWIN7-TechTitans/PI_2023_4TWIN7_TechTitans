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
import Profile from "views/examples/Profile.js";
import addcar from "views/examples/addCar";
import AddStatement from "views/examples/addStatement";
import ViewProfile from "views/examples/ViewProfile";

var routesMain = [
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
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/main",
    showInSidebar: true,
  },
  
  {
      path: "/addcar",
      name: "Add Your Car",
      icon: "ni ni-bus-front-12 text-primary",
      component: addcar,
      layout: "/main",
      showInSidebar: false,
    },
    {
      path: "/addstatement",
      name: "Add a Statement",
      icon: "ni ni-collection text-red",
      component: AddStatement,
      layout: "/main",
      showInSidebar: false,
    },
];
export default routesMain;
