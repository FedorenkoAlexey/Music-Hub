// import React from "react";

// const ArtistBioComponent = () => {
//   // console.log("PROPS-BIO: ", this.props);
//   return <div>artist header</div>;
// };

// export default ArtistBioComponent;

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";

import { getArtistInfo } from "../../store/actions/getTracks";

class ArtistBioComponent extends Component {
  componentDidMount() {
    console.log("!BBBBBBBBBBBBBBBBBBBB");
  }
  render() {
    return <div>Artist BIO_2 Component</div>;
  }
}

const mapState = (state, ownProps) => {
  return {
    artistInfo: state.trackReducer.artistInfo
  };
};

export default connect(mapState)(ArtistBioComponent);
