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

import AddNewContract from "views/examples/addContract";
import Tickets from "views/examples/Tickets";
import ListofStatement from "views/examples/ListOfStatement";
import odm from "views/examples/OrdreMissionExpert";
import AddExpert from "views/examples/addExpert";
import ListOfExperts from "views/examples/ListOfExperts";

var routesAgence = [
  //TODO : change admin to user view profile
  
  {
    path: "/addcontract",
    name: "Add New Contract",
    icon: "ni ni-fat-add text-black",
    component: AddNewContract,
    layout: "/agence",
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
  {
    path: "/ListofStatements",
    name: "ListOfStatement",
    icon: "ni ni-bullet-list-67 text-blue",
    component: ListofStatement,
    layout: "/agence",
    showInSidebar: true,
  },
  {
    path: "/odm",
    name: "Ordre de mission",
    icon: "ni ni-bullet-list-67 text-blue",
    component: odm,
    layout: "/agence",
    showInSidebar: true,
  },
  {
    path: "/addexpert",
    name: "Add Expert",
    icon: "ni ni-bullet-list-67 text-blue",
    component: AddExpert,
    layout: "/agence",
    showInSidebar: true,
  },
  {
    path: "/listexpet",
    name: "List Of Our Experts",
    icon: "ni ni-bullet-list-67 text-blue",
    component: ListOfExperts,
    layout: "/agence",
    showInSidebar: true,
  }
];
export default routesAgence;
