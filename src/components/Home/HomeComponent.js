import React, { Component } from "react";
import googleService from "../../services/googleService";
import musicService from "../../services/musicService";
import { connect } from "react-redux";
import cookie from "react-cookies";

import { getGoogleName, isGoogleAuth } from "../../store/actions/googleAuth";
import "./styles.css";
import "./fonts.css";

class HomeComponent extends Component {
  apiGoogle = new googleService();
  apiMusic = new musicService();

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      errColor: "",
      fontWeight: "",
    };
  }

  componentDidMount() {
    this.apiGoogle.googleInit();
    const logged = cookie.load("token");
    logged ? this.props.isGoogleAuth(true) : console.log("Cookies empty");
    // this.props.isGoogleAuth(true);
  }

  onSignIn = () => {
    this.apiGoogle.signIn().then((res) => {
      this.props.getGoogleName(res.getName());
      this.props.isGoogleAuth(true);
      cookie.save("token", res.getName(), { path: "/" });
      console.log(cookie.load("token"));
      // console.log("RES", res, "TOKEN: ", res.dV, res.getName());
      // console.log(this.props);
    });
  };

  onLogin = () => {
    const { authLogin, authPassword } = this.props;
    const { login, password } = this.state;
    if (authLogin === login && authPassword === password) {
      console.log("YES");
      this.setState({
        login: "",
        password: "",
      });
      this.props.isGoogleAuth(true);
      this.props.getGoogleName(login);
      cookie.save("token", login, { path: "/" });

      // this.props.activateSpinner();
      // setTimeout(() => {
      //   this.props.setLogin();
      // }, 1000);
      // cookie.save("token", token, { path: "/" });
    } else {
      this.setState({
        errColor: "#ff0000",
        fontWeight: "800",
      });
      setTimeout(() => {
        this.setState({
          errColor: "",
          fontWeight: "",
        });
      }, 1500);
      console.log("Err");
    }
  };

  onSignOut = () => {
    console.log("LOG OUT");
    this.apiGoogle.signOut().then(() => {
      this.props.getGoogleName(null);
      this.props.isGoogleAuth(false);
      cookie.remove("token", { path: "/" });
    });
  };

  onLoginHandle = (e) => {
    // console.log(e.target.value);
    this.setState({
      login: e.target.value,
    });
  };

  onPasswordHandle = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  y;

  onGenius = () => {
    // this.apiMusic.onSearch("madonna");
    this.apiMusic.trackInfo().then((res) => console.log("INFO", res.data));
  };

  render() {
    const { isAuth } = this.props;
    const { login, password } = this.state;
    const errorColor = {
      // border: this.state.errBorder,
      color: this.state.errColor,
      fontWeight: this.state.fontWeight,
      // background: this.state.errColor,
    };
    return (
      <div className="home-wrapper">
        {/* <button onClick={this.onGenius}>!!!!!!!!!</button> */}
        <div className="left-wrap">
          <div className="message">
            {isAuth ? (
              <h3 className="test">
                <span className="send">Welcome</span>
              </h3>
            ) : (
              <div className="auth-container">
                <h3 className="test">
                  <span className="send">Sign In </span>To access the site
                </h3>

                <div className="google-mess">
                  {!isAuth && (
                    <button className="btn-google" onClick={this.onSignIn}>
                      <span className="span"></span>
                      Sign in with Google
                    </button>
                  )}
                  {isAuth && <button onClick={this.onSignOut}>Sign Out</button>}
                </div>

                <div className="or">
                  <div className="or-left"></div>
                  OR
                  <div className="or-right"></div>
                </div>

                <input
                  style={errorColor}
                  type="text"
                  className="input"
                  placeholder="Login"
                  value={login}
                  onChange={this.onLoginHandle}
                />
                <div className="line"></div>
                <input
                  style={errorColor}
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={this.onPasswordHandle}
                />
                <div className="line"></div>
              </div>
            )}
            {isAuth ? (
              <button className="login-btn" onClick={this.onSignOut}>
                Sign Out
              </button>
            ) : (
              <button className="login-btn" onClick={this.onLogin}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    googleName: state.googleReducer.googleName,
    isAuth: state.googleReducer.isAuth,
    authLogin: state.googleReducer.authLogin,
    authPassword: state.googleReducer.authPassword,
  };
};

const dispatch = {
  getGoogleName: getGoogleName,
  isGoogleAuth: isGoogleAuth,
};

export default connect(mapState, dispatch)(HomeComponent);
