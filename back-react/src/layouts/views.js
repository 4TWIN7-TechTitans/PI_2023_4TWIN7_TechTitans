import React, { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Button, Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routesAdmin from "routesAdmin.js";
import SidebarMain from "components/Sidebar/SidebarMain";

const views = (props) => {
 
  const filteredRoutes = routesAdmin.filter((route) => {
    return route.showInSidebar;
  });

  const getRoutes = (routesAdmin) => {
    return routesAdmin.map((prop, key) => {
      if (prop.layout === "/views") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };


  return (
    <>
            <Switch>
          {getRoutes(routesAdmin)}
          
          <Redirect from="*" to="/views/myaccount" />
        </Switch>
</>
  );
};
function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
export default views;
