import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";
import Header from "components/Headers/Header";

function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
class Index extends React.Component {
  state = {
    tabs: 1,
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index,
    });
  };
/*
  componentDidMount() {
    if (getCookie("role") !== "admin") window.location.href = "/auth/login";
  }*/

  render() {
    return (
      <>
        <Header />
               <Card className="shadow"></Card>
      </>
    );
  }
}

export default Index;
