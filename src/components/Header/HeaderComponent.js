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
        <NavLink to="/artists" activeClassName="active" className="text-link">
          Artists
        </NavLink>
      </div>
    );
  }
}

export default HeaderComponent;
