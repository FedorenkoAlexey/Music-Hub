import React, { Component } from "react";
// import axios from "axios";
import { connect } from "react-redux";
// import { Route, Switch, NavLink } from "react-router-dom";

// import { getArtistInfo } from "../../store/actions/getTracks";

class ChartTagComponent extends Component {
  componentDidMount() {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  }

  render() {
    return <div>CHART TAG Component</div>;
  }
}

const mapState = (state, ownProps) => {
  return {
    // artistInfo: state.trackReducer.artistInfo
  };
};

export default connect(mapState)(ChartTagComponent);
