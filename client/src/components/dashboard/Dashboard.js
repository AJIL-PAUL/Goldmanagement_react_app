import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import store from "../../store";
import Register from "../auth/Register";
import { Retrieve } from "./Retrieve";
import { Addnew } from "./Addnew";
import { Viewdetails } from "./Viewdetails";
import { Boxdetails } from "./Boxdetails";
import PrivateRoute from "../private-route/PrivateRoute";
const { Content, Sider } = Layout;

class Dashboard extends Component {
  onLogoutClick = e => {
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const menu = (
      <Menu>
        <Menu.Item onClick={this.onLogoutClick} key="0">
          Logout
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item key="1">
          <Link to="/dashboard/adduser" className="nav-text">Add User</Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <Provider store={store}>
        <Router>
          <Layout >
            <Sider
              breakpoint="md"
              collapsedWidth="0"
              onBreakpoint={broken => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <div className="logo" >
                <h5 style={{ paddingTop: "2vh", paddingLeft: "2vh" }}>Home</h5>
                <Dropdown overlay={menu} trigger={['click']}>
                  <div style={{ textAlign: "right", paddingBottom: "1vh", marginRight: "2vh" }}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      {user.name.split(" ")[0]} &nbsp;<Avatar icon={<UserOutlined />} />
                      <DownOutlined />
                    </a>
                  </div>
                </Dropdown>
              </div>
              <Menu theme='light' mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <UserOutlined />
                  <Link to="/dashboard/addnew" className="nav-text">Add Customer</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <FileTextOutlined />
                  <Link to="/dashboard/details" className="nav-text">Customer Details</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <UserOutlined />
                  <Link to="/dashboard/retrieve" className="nav-text">Retrieve</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <FileTextOutlined />
                  <Link to="/dashboard/boxdetails" className="nav-text">Box details</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>

              <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: "90vh" }}>
                  <Switch>
                    <PrivateRoute exact={true} path="/dashboard" component={Addnew} />
                    <PrivateRoute exact={true} path="/dashboard/addnew" component={Addnew} />
                    <PrivateRoute exact path="/dashboard/details" component={Viewdetails} />
                    <PrivateRoute exact path="/dashboard/adduser" component={Register} />
                    <PrivateRoute exact path="/dashboard/retrieve" component={Retrieve} />
                    <PrivateRoute exact path="/dashboard/boxdetails" component={Boxdetails} />
                  </Switch>
                </div>
              </Content>

            </Layout>
          </Layout>
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
