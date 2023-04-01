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
        <div className="nav-wrapper">
          <Nav
            className="nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 1}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 1,
                })}
                onClick={(e) => this.toggleNavs(e, "tabs", 1)}
                href="/index"
                role="tab"
              >
                <i className="ni ni-cloud-upload-96 mr-2" />
                Home
              </NavLink>
            </NavItem>
            <NavItem onClick={(e) => this.toggleNavs(e, "tabs", 2)}>
              <NavLink
                aria-selected={this.state.tabs === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 2,
                })}
                href="/admin/add"
                role="tab"
              >
                <i className="ni ni-active-40 mr-2" />
                Add user
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 3,
                })}
                onClick={(e) => this.toggleNavs(e, "tabs", 3)}
                href="/admin/listofusers"
                role="tab"
              >
                <i className="ni ni-align-center mr-2" />
                List Of Users
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Card className="shadow"></Card>
      </>
    );
  }
}

export default Index;
