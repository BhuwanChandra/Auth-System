import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticateUser, logoutUser } from "../redux/actions";
import { Layout, Typography } from "antd";
import {
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  YoutubeFilled
} from "@ant-design/icons";
import Login from "./Login";
import SignUp from "./Signup";
import Home from "./Home";

const Main = ({ authToken, userDetails, authenticateUser, logoutUser }) => {
  const { Header, Footer, Content } = Layout;
  const { Title } = Typography;

  useEffect(() => {
    let user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    let token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    if (user && token) {
      authenticateUser({ user, token });
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 10, height: "8%", backgroundColor: '#5c1b77', justifyContent: 'center' }}>
        <Title style={{ color: "#fff" }} level={3}>
          Auth-System
        </Title>
      </Header>
      <Layout>
        <Content style={{ height: "82%", display: "flex" }}>
          {!(authToken && authToken.length) ? (
            <div style={authStyles}>
              <Login />
              <SignUp />
            </div>
          ) : (
            <Home userDetails={userDetails} logout={logoutUser} />
          )}
        </Content>
        <Footer
          style={{
            backgroundColor: "#c6cdff",
            height: "10%",
            textAlign: "center"
          }}
        >
          <div className="social-container">
            <FacebookFilled className="social-icon" />
            <InstagramFilled className="social-icon" />
            <TwitterCircleFilled className="social-icon" />
            <YoutubeFilled className="social-icon" />
          </div>
          &#169;Auth-System - 2020
        </Footer>
      </Layout>
    </Layout>
  );
};

const authStyles = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  justifyContent: "space-evenly",
  width: "50%",
  margin: "auto"
};

const mapStateToProps = state => {
  return {
    authToken: state.authToken,
    userDetails: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateUser: user => dispatch(authenticateUser(user)),
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
