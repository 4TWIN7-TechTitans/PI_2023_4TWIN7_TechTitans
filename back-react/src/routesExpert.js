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
var routesExpert = [
  //TODO : change admin to user view profile
  {
    path: "/",
    name: "Expert Profile",
    icon: "ni ni-tv-2 text-primary",
    component: "",
    layout: "/expert",
    showInSidebar: true,
  },
  {
    path: "/OrdreMissionExpert",
    name: "Mission Profile",
    icon: "ni ni-tv-2 text-primary",
    component: "OrdreMissionExpert",
    layout: "/expert",
    showInSidebar: true,
  }
 
 
];
export default routesExpert;
