import React, { Component } from "react";
import { connect } from "react-redux";
import {
  // Route, Switch,
  NavLink
} from "react-router-dom";
// import { Route, Switch, NavLink } from "react-router-dom";
import artistService from "../../services/artistService";
import cover from "../../assets/images/noCover.png";
import "./styles.css";

import { getArtistInfo } from "../../store/actions/getTracks";

class SearchComponent extends Component {
  api = new artistService();

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     imgAlbum: ""
  //   };
  // }

  componentDidMount() {
    // console.log("search ", this.props);
  }

  click = () => {
    console.log("search-click ", this.props);
  };
  artInfo = artistName => {
    console.log("name", artistName);
    this.api.getArtist(artistName).then(res => {
      this.props.getArtistInfo(res.data);
    });
  };

  render() {
    const { album } = this.props.searchAlbums;
    const { track } = this.props.searchTracks;
    const { artist } = this.props.searchArtists;
    return (
      <div className="search-container">
        <div className="search-res-artist">Artists results</div>

        <ul className="search-artist">
          {artist.map(artist => (
            <li className="artist-item" key={artist.url + artist.listeners}>
              {/* <div className="artist-name">{artist.name}</div> */}

              <NavLink
                className="artist-name"
                activeClassName="active"
                to={`/artist/${artist.name}/bio`}
              >
                {artist.name}
              </NavLink>

              <div className="artist-listen">listeners: {artist.listeners}</div>
            </li>
          ))}
        </ul>

        <div className="search-res-text">
          Albums results
          {/* <button onClick={() => this.click()}>!!!!!!</button> */}
        </div>
        <ul className="search-albums">
          {album.map(album => (
            <li className="album-item" key={album.name + album.url}>
              <div className="album-img">
                <img
                  src={
                    album.image[2]["#text"] === ""
                      ? cover
                      : album.image[2]["#text"]
                  }
                  alt={"album-img"}
                />
              </div>
              <span className="album-name">
                {/* <NavLink
                  onClick={() => this.artInfo(album.artist)}
                  className="album-name"
                  activeClassName="active"
                  to={`/artist/${album.artist}/album/${album.name}`}
                > */}
                {album.name}
                {/* </NavLink> */}
              </span>
              <span>
                <NavLink
                  className="artist-name"
                  activeClassName="active"
                  to={`/artist/${album.artist}/bio`}
                >
                  {album.artist}
                </NavLink>
              </span>
            </li>
          ))}
        </ul>
        <div className="search-res-text-track">Tracks results</div>
        <ol className="search-tracks">
          {track.map(track => (
            <li className="track-item" key={track.listeners + track.name}>
              <div className="track-block">
                <div className="track-name">{track.name} </div>

                <NavLink
                  className="track-artist"
                  activeClassName="active"
                  to={`/artist/${track.artist}/bio`}
                >
                  {track.artist}
                </NavLink>

                <div className="track-listen">listeners: {track.listeners}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    artistInfo: state.trackReducer.artistInfo,
    searchValue: state.trackReducer.searchValue,
    searchAlbums: state.searchReducer.searchAlbums,
    searchTracks: state.searchReducer.searchTracks,
    searchArtists: state.searchReducer.searchArtists
  };
};

const dispatch = {
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(SearchComponent);
