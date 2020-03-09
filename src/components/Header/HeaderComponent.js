import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import googleService from "../../services/googleService";
import { getGoogleName, isGoogleAuth } from "../../store/actions/googleAuth";
import cookie from "react-cookies";
import "./styles.css";

class HeaderComponent extends Component {
  apiGoogle = new googleService();
  componentDidMount() {
    let token = cookie.load("token");
    console.log(token);
  }

  onSignOut = () => {
    console.log("LOG OUT");
    this.apiGoogle.signOut().then(() => {
      this.props.getGoogleName(null);
      this.props.isGoogleAuth(false);
      cookie.remove("token", { path: "/" });
    });
  };

  render() {
    const { googleName, isAuth } = this.props;
    return (
      <div className="header">
        <div className="header-logo">MusicHUB FM</div>
        <div className="header-nav">
          {this.props.isAuth ? (
            <span>
              <NavLink to="/" activeClassName="active" className="text-link">
                Home
              </NavLink>
              <NavLink
                to="/chart"
                activeClassName="active"
                className="text-link"
              >
                Top Chart Track
              </NavLink>
            </span>
          ) : (
            <h2>Sign in please</h2>
          )}
        </div>
        <div className="header-user">
          {isAuth && (
            <div>
              <p className="welcome">Welcome</p> {googleName}
              <p>
                <button onClick={this.onSignOut}>Sign Out</button>
              </p>
            </div>
          )}
        </div>
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

export default connect(mapState, dispatch)(HeaderComponent);
