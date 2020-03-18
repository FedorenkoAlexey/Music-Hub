import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import googleService from "../../services/googleService";
import searchService from "../../services/searchService";
import { getGoogleName, isGoogleAuth } from "../../store/actions/googleAuth";
import {
  getSearchAlbums,
  getSearchArtist,
  getSearchTracks
} from "../../store/actions/search";
import { setSearchValue } from "../../store/actions/getTracks";
import cookie from "react-cookies";
import "./styles.css";

class HeaderComponent extends Component {
  apiGoogle = new googleService();
  apiSearch = new searchService();

  componentDidMount() {
    let token = cookie.load("token");
    this.props.getGoogleName(token);
    console.log("NAME", this.props.googleName, "TOKEN", token);
  }

  onSignOut = () => {
    console.log("LOG OUT");
    this.apiGoogle.signOut().then(() => {
      this.props.getGoogleName(null);
      this.props.isGoogleAuth(false);
      cookie.remove("token", { path: "/" });
    });
  };

  onSearchHandle = e => {
    let search = e.target.value;
    this.props.setSearchValue(search);
  };

  onSearch = params => {
    if (params === "") {
      console.log("Set search params");
    } else {
      this.apiSearch.getSearchArtist(params).then(res => {
        this.props.getSearchArtist(res.data.results.artistmatches);
        // console.log("RES_SEARCH_ARTIST", res.data.results.artistmatches);
        console.log("Props_ARTIST", this.props);
      });

      this.apiSearch.getSearchAlbums(params).then(res => {
        this.props.getSearchAlbums(res.data.results.albummatches);
      });

      this.apiSearch.getSearchTracks(params).then(res => {
        this.props.getSearchTracks(res.data.results.trackmatches);
        // console.log("RES_SEARCH_TRAKS", res.data.results.trackmatches);
      });
    }
  };

  render() {
    const { googleName, isAuth, searchValue } = this.props;
    return (
      <div className="wrapper">
        <div className="header">
          <div className="header-logo">MusicHUB FM</div>
          <div className="header-nav">
            {this.props.isAuth ? (
              <span className="navlink">
                <NavLink to="/" activeClassName="active" className="text-link">
                  Home
                </NavLink>
                <NavLink
                  to="/chart"
                  activeClassName="active"
                  className="text-link"
                >
                  Top Chart Track
                </NavLink>
              </span>
            ) : (
              <h2>Sign in please</h2>
            )}
          </div>
          <div className="header-user">
            {isAuth && (
              <div>
                <p className="welcome">Welcome</p> {googleName}
                <p>
                  <button onClick={this.onSignOut}>Sign Out</button>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="search">
          <input
            type="text"
            value={searchValue}
            onChange={this.onSearchHandle}
          />
          {/* <button onClick={this.onSearch}>Search</button> */}
          <NavLink
            activeClassName="active"
            to={`/search/${searchValue}`}
            onClick={() => this.onSearch(searchValue)}
          >
            search
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    googleName: state.googleReducer.googleName,
    isAuth: state.googleReducer.isAuth,
    searchValue: state.trackReducer.searchValue,
    searchAlbums: state.searchReducer.searchAlbums,
    searchTracks: state.searchReducer.searchTracks,
    searchArtists: state.searchReducer.searchArtists
  };
};

const dispatch = {
  getGoogleName: getGoogleName,
  isGoogleAuth: isGoogleAuth,
  setSearchValue: setSearchValue,
  getSearchAlbums: getSearchAlbums,
  getSearchArtist: getSearchArtist,
  getSearchTracks: getSearchTracks
};

export default connect(mapState, dispatch)(HeaderComponent);
