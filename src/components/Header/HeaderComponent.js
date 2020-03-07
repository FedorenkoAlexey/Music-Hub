import React, { Component } from "react";
// import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";

class HeaderComponent extends Component {
  render() {
    return (
      <div className="header">
        HEADER
        <NavLink to="/home" activeClassName="active" className="text-link">
          Home
        </NavLink>
        <NavLink to="/chart" activeClassName="active" className="text-link">
          Top Chart Track
        </NavLink>
      </div>
    );
  }
}

export default HeaderComponent;
