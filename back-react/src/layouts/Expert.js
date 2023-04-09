import React, { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Button, Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routesExpert from "routesExpert.js";
import SidebarExpert from "components/Sidebar/SidebarExpert";
import OrdreMissionExpert from "views/examples/OrdreMissionExpert"; 
import DetailsStatement from "views/examples/DetailsStatement";
import MyStatusExpert from "views/examples/MyStatusExpert";
import Header from "components/Headers/Header.js";
const Expert = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
 
  const filteredRoutes = routesExpert.filter((route) => {
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


  const getRoutes = (routesExpert) => {
    return routesExpert.map((prop, key) => {
      if (prop.layout === "/expert") {
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
    for (let i = 0; i < routesExpert.length; i++) {
      if (
        props.location.pathname.indexOf(routesExpert[i].layout + routesExpert[i].path) !==
        -1
      ) {
        return routesExpert[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
     <SidebarExpert
        {...props}
        routesExpert={filteredRoutes}
        logo={{
          innerLink: "/expert/index",
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
          {getRoutes(routesExpert)}
          
         
        </Switch>
       {window.location.pathname === "/expert/OrdreMissionExpert"  && (<OrdreMissionExpert/>)}
       {/* {window.location.pathname === "/expert/mystatus"  && (<><Header/><MyStatusExpert/></>)} */}
      
        
        <Container fluid>
         
         
          
        </Container>
      </div>
    </>
  );
};
function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
export default Expert;
