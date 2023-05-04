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

import OrdreMissionExpert from "views/examples/OrdreMissionExpert";
import DetailsStatement from "views/examples/DetailsStatement";
import Forum from "views/examples/forum";
var routesExpert = [
  //TODO : change admin to user view profile
  {
    path: "/",
    name: "Expert Profile",
    icon: "ni ni-tv-2 text-primary",
    component: "",
    layout: "/expert",
    showInSidebar: false,
  },
  {
    path: "/OrdreMissionExpert",
    name: "Ordre de mission",
    icon: "ni ni-bullet-list-67 text-blue",
    component: OrdreMissionExpert,
    layout: "/expert",
    showInSidebar: true,
  },
  {
    path: "/Forum",
    name: "Forum",
    icon: "ni ni-bullet-list-67 text-blue",
    component: Forum,
    layout: "/expert",
    showInSidebar: true,
  },
  {
    path: "/detailsstatement",
    name: "Details",
    icon: "ni ni-bullet-list-67 text-blue",
    component: DetailsStatement,
    layout: "/expert",
    showInSidebar: false,
  },
 
];
export default routesExpert;
