import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Provider } from "react-redux";
import store from "../../store";
import Register from "../auth/Register";

import { Addnew } from "./Addnew";
import { Viewdetails } from "./Viewdetails";
import PrivateRoute from "../private-route/PrivateRoute";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { match } = this.props;
    const { user } = this.props.auth;
    console.log(match.url);

    return (
      <Provider store={store}>
        <Router>

          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand as={NavLink} to="/dashboard">Home</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={NavLink} to="/dashboard/addnew">Add</Nav.Link>
                  <Nav.Link as={NavLink} to="/dashboard/details">Details</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                  <NavDropdown title={user.name.split(" ")[0]} id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={this.onLogoutClick}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={NavLink} to="/dashboard/adduser">AddNew User</Nav.Link>

                </Nav>
              </Navbar.Collapse>
            </Navbar>
            {/* Routing */}
            <Switch>
              <PrivateRoute exact={true} path="/dashboard/addnew" component={Addnew} />
              <PrivateRoute exact path="/dashboard/details" component={Viewdetails} />
              <PrivateRoute exact path="/dashboard/adduser" component={Register} />
            </Switch>
          </div>
        </Router>
      </Provider>

    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
