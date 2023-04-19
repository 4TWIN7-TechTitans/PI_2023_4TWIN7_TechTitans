import React, { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Button, Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import SidebarAgence from "components/Sidebar/SidebarAgence.js";
import OdmAgence from "views/examples/OdmAgence";
import routesAgence from "routesAgence.js";
const Agence = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
 
  const filteredRoutes = routesAgence.filter((route) => {
    return route.showInSidebar;
  });
 
  
  const [role, setRole] = useState("");
  const [statementId, setStatementId] = useState("");

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;

  }, [location]);

  React.useEffect(() => {
    setRole(getCookie("role"))

  }, []);


  const getRoutes = (routesAgence) => {
    return routesAgence.map((prop, key) => {
      if (prop.layout === "/agence") {
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
    for (let i = 0; i < routesAgence.length; i++) {
      if (
        props.location.pathname.indexOf(routesAgence[i].layout + routesAgence[i].path) !==
        -1
      ) {
        return routesAgence[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
     <SidebarAgence
        {...props}
        routesAgence={filteredRoutes}
        logo={{
          innerLink: "/agence/index",
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
          {getRoutes(routesAgence)}
          
          <Redirect from="*" to="/agence/index" />
        </Switch>
        {window.location.pathname === "/agence/OdmAgence" && (<OdmAgence/>)}


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
export default Agence;
