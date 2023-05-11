import React, { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Button, Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routesMain from "routesMain.js";
import SidebarMain from "components/Sidebar/SidebarMain";

const Main = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
 
  const filteredRoutes = routesMain.filter((route) => {
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


  const getRoutes = (routesMain) => {
    return routesMain.map((prop, key) => {
      if (prop.layout === "/main") {
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
    for (let i = 0; i < routesMain.length; i++) {
      if (
        props.location.pathname.indexOf(routesMain[i].layout + routesMain[i].path) !==
        -1
      ) {
        return routesMain[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
     <SidebarMain
        {...props}
        routesMain={filteredRoutes}
        logo={{
          innerLink: "/main/index",
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
          {getRoutes(routesMain)}
          
          <Redirect from="*" to="/main/index" />
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
export default Main;
