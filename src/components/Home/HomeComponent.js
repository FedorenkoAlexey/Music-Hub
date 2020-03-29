import React, { Component } from "react";
import googleService from "../../services/googleService";
import { connect } from "react-redux";
import cookie from "react-cookies";

import { getGoogleName, isGoogleAuth } from "../../store/actions/googleAuth";

class HomeComponent extends Component {
  apiGoogle = new googleService();

  componentDidMount() {
    this.apiGoogle.googleInit();
    const logged = cookie.load("token");
    logged ? this.props.isGoogleAuth(true) : console.log("Cookies empty");
    // this.props.isGoogleAuth(true);
  }

  onSignIn = () => {
    this.apiGoogle.signIn().then(res => {
      this.props.getGoogleName(res.getName());
      this.props.isGoogleAuth(true);
      cookie.save("token", res.getName(), { path: "/" });
      console.log(cookie.load("token"));
      // console.log("RES", res, "TOKEN: ", res.dV, res.getName());
      // console.log(this.props);
    });
  };

  onSignOut = () => {
    console.log("LOG OUT");
    this.apiGoogle.signOut().then(() => {
      this.props.getGoogleName(null);
      this.props.isGoogleAuth(false);
      cookie.remove("token", { path: "/" });
    });
  };

  onClick = () => {
    console.log("click", this.props);
  };

  render() {
    const { isAuth } = this.props;
    return (
      <div>
        Home Component
        <div>
          {!isAuth && <button onClick={this.onSignIn}>Sign In</button>}
          {isAuth && <button onClick={this.onSignOut}>Sign Out</button>}
        </div>
        {/* <button onClick={this.onClick}>props</button> */}
      </div>
    );
  }
}

const mapState = state => {
  return {
    googleName: state.googleReducer.googleName,
    isAuth: state.googleReducer.isAuth
  };
};

const dispatch = {
  getGoogleName: getGoogleName,
  isGoogleAuth: isGoogleAuth
};

export default connect(mapState, dispatch)(HomeComponent);
