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
import AddExpert from "views/examples/addExpert";
import ListOfExperts from "views/examples/ListOfExperts";
import OdmAgence from "views/examples/OdmAgence";
import Detailssag from "views/examples/Detailssag";
import accplacechart  from "views/examples/accplacechart";
import Clientavi from "views/examples/Clientavi";
var routesAgence = [
  //TODO : change admin to user view profile
  
  {
    path: "/addcontract",
    name: "Add New Contract",
    icon: "ni ni-fat-add text-black",
    component: AddNewContract,
    layout: "/agence",
    showInSidebar: false,
  },
  
  {
    path: "/tickets",
    name: "Claims",
    icon: "ni ni-tv-2 text-blue",
    component: Tickets,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/odmagence",
    name: "List Of Statements",
    icon: "ni ni-bullet-list-67 text-blue",
    component: OdmAgence,
    layout: "/agence",
    showInSidebar: true,
  },
  {
    path: "/addexpert",
    name: "Add Expert",
    icon: "ni ni-bullet-list-67 text-blue",
    component: AddExpert,
    layout: "/agence",
    showInSidebar: false,
  },
  {
    path: "/listexpert",
    name: "List Of Our Users",
    icon: "ni ni-bullet-list-67 text-blue",
    component: ListOfExperts,
    layout: "/agence",
    showInSidebar: true,
  },

  {
    path: "/detailssag",
    name: "Detailssag",
    icon: "ni ni-bullet-list-67 text-blue",
    component: Detailssag,
    layout: "/agence",
    showInSidebar: false,
  },

  {
    path: "/accplacechart",
    name: "Most Frequent Accidents Chart",
    icon: "ni ni-bullet-list-67 text-blue",
    component: accplacechart,
    layout: "/agence",
    showInSidebar: true,
  },

  {
    path: "/clientavi",
    name: "Expert Evaluation",
    icon: "ni ni-bullet-list-67 text-blue",
    component: Clientavi,
    layout: "/agence",
    showInSidebar: true,
  },

];
export default routesAgence;
