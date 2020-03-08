import React, { Component } from "react";
// import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import "./styles.css";

class HeaderComponent extends Component {
  render() {
    return (
      <div className="header">
        HEADER
        <div className="header-nav">
          <NavLink to="/home" activeClassName="active" className="text-link">
            Home
          </NavLink>
          <NavLink to="/chart" activeClassName="active" className="text-link">
            Top Chart Track
          </NavLink>
        </div>
        <div className="header-user">User Name</div>
      </div>
    );
  }
}

export default HeaderComponent;
