import React, { Component } from "react";
import { connect } from "react-redux";
// import { Route, Switch, NavLink } from "react-router-dom";
import apiService from "../../services/apiService";
// import "./styles.css";

import { getArtistInfo } from "../../store/actions/getTracks";

class SearchComponent extends Component {
  apiService = new apiService();

  componentDidMount() {
    // const artistName = this.props.match.params.id || "";
  }

  getArtInfo = artistName => {
    this.apiService.getArtist(artistName).then(res => {
      this.props.getArtistInfo(res.data);
    });
  };

  render() {
    return <div className="search-container">SEARCH RESULT</div>;
  }
}

const mapState = (state, ownProps) => {
  return {
    artistInfo: state.trackReducer.artistInfo
  };
};

const dispatch = {
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(SearchComponent);
