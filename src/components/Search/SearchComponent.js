import React, { Component } from "react";
import { connect } from "react-redux";
// import { Route, Switch, NavLink } from "react-router-dom";
import apiService from "../../services/apiService";
// import "./styles.css";

import { getArtistInfo } from "../../store/actions/getTracks";

class SearchComponent extends Component {
  apiService = new apiService();

  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }

  componentDidMount() {
    // let searchValue = this.props.match.params.id || "2";
  }
  componentWillMount() {}

  getArtInfo = artistName => {
    console.log("searsh ", artistName);
    this.apiService.getArtist(artistName).then(res => {
      this.props.getArtistInfo(res.data);
    });
  };

  click = () => {
    // this.setState({
    //   searchValue: this.props.match.params.id
    // }););
    console.log("PROPS_ID", this.props.match.params.id);
  };

  render() {
    return (
      <div className="search-container">
        SEARCH RESULT
        <div className="search-res-text">
          Result search for {this.state.searchValue}
          <br></br>
          this searchValue {this.searchValue}
        </div>
        <button onClick={() => this.click()}>!!!!!!</button>
      </div>
    );
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
