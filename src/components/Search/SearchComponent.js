import React, { Component } from "react";
import { connect } from "react-redux";
import {
  // Route, Switch,
  NavLink
} from "react-router-dom";
// import { Route, Switch, NavLink } from "react-router-dom";
import apiService from "../../services/apiService";
import "./styles.css";

import { getArtistInfo } from "../../store/actions/getTracks";

class SearchComponent extends Component {
  apiService = new apiService();

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     imgAlbum: ""
  //   };
  // }

  componentDidMount() {
    console.log("search ", this.props);
    // let searchValue = this.props.match.params.id || "2";
  }
  componentWillMount() {}

  click = () => {
    console.log("search-click ", this.props);
    // this.setState({
    //   searchValue: this.props.match.params.id
    // }););
    // console.log("PROPS_ID", this.props.match.params.id);
  };

  render() {
    const { album } = this.props.searchAlbums;
    return (
      <div className="search-container">
        <div className="search-res-text">
          Result search for {this.props.searchValue}
        </div>
        {/* <div className="search-albums"> */}
        <ul className="search-albums">
          {album.map(album => (
            <li className="album-item" key={album.name}>
              <div className="album-img">
                <img src={album.image[2]["#text"]} alt={"album-img"} />
              </div>
              <span className="album-name">{album.name}</span>
              <span key={album.mbid}>
                <NavLink
                  className="artist-name"
                  activeClassName="active"
                  to={`/artist/${album.artist}`}
                >
                  {album.artist}
                </NavLink>
              </span>
            </li>
          ))}
        </ul>
        {/* </div> */}
        <button onClick={() => this.click()}>!!!!!!</button>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    artistInfo: state.trackReducer.artistInfo,
    searchValue: state.trackReducer.searchValue,
    searchAlbums: state.searchReducer.searchAlbums
  };
};

const dispatch = {
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(SearchComponent);
