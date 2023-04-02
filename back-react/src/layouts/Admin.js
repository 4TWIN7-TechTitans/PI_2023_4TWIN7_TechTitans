import React, { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Button, Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";

import routesAdmin from "routesAdmin.js";
import SidebarAdmin from "components/Sidebar/SidebarAdmin";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
 
  const filteredRoutes = routesAdmin.filter((route) => {
    return route.showInSidebar;
  });
 
  
  const [role, setRole] = useState("");

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;

  }, [location]);

  React.useEffect(() => {
    setRole(getCookie("role"))

  }, []);


  const getRoutes = (routesAdmin) => {
    return routesAdmin.map((prop, key) => {
      if (prop.layout === "/admin") {
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

  const getBrandText = (path) => {
    for (let i = 0; i < routesAdmin.length; i++) {
      if (
        props.location.pathname.indexOf(routesAdmin[i].layout + routesAdmin[i].path) !==
        -1
      ) {
        return routesAdmin[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
     <SidebarAdmin
        {...props}
        routesAdmin={filteredRoutes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
       
        <Switch>
          {getRoutes(routesAdmin)}
          
         
        </Switch>
        
        <Container fluid>
          <AdminFooter />
          
        </Container>
      </div>
    </>
  );
};
function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
export default Admin;
