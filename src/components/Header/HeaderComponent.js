import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import googleService from "../../services/googleService";
import { getGoogleName } from "../../store/actions/googleAuth";
import "./styles.css";

class HeaderComponent extends Component {
  apiGoogle = new googleService();
  componentDidMount() {}

  onSignOut = () => {
    console.log("LOG OUT");
    this.apiGoogle.signOut().then(() => {
      this.props.getGoogleName(null);
    });
  };

  render() {
    const { googleName } = this.props;
    return (
      <div className="header">
        <div className="header-logo">MusicHUB FM</div>
        <div className="header-nav">
          <NavLink to="/home" activeClassName="active" className="text-link">
            Home
          </NavLink>
          <NavLink to="/chart" activeClassName="active" className="text-link">
            Top Chart Track
          </NavLink>
        </div>
        <div className="header-user">
          {!!googleName && (
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
    googleName: state.googleReducer.googleName
  };
};

const dispatch = {
  getGoogleName: getGoogleName
};

export default connect(mapState, dispatch)(HeaderComponent);
