import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";

import ArtistBioComponent from "../ArtistInfo/ArtistBioComponent";
import ArtistTopTrackComponent from "../ArtistInfo/ArtistTopTrackComponent";
import artistService from "../../services/artistService";

import { getArtistInfo, getTopAlbums } from "../../store/actions/getTracks";
import "./styles.css";

class ArtistNameComponent extends Component {
  api = new artistService();
  image = "";

  componentDidMount() {
    const artistName = this.props.match.params.id || "";
    console.log("artistName", artistName);
    console.log("this.props.artistInfo", this.props.artistInfo);

    // let image = "";
    // let image =
    //   "https://lastfm.freetls.fastly.net/i/u/300x300/71cc320aa75906f6e4760aaaeb96b845.png";

    this.api.getTopAlbums(artistName).then(result => {
      this.props.getTopAlbums(result.data.topalbums);
      this.image = this.props.topAlbums.album[0].image[3]["#text"];
      // console.log("ALBUMS: ", this.props.topAlbums.album[0].image[3]["#text"]);
      // console.log("ALBUMS: ", this.props.topAlbums);
    });
  }

  render() {
    const { artist } = this.props.artistInfo;
    // const { album } = this.props.topAlbums;
    return (
      <div className="artist-container">
        Artist Name Component
        <div className="artist-header">
          <div className="artist-info">
            <div className="artist-name">{artist.name}</div>
            <div className="artist-listen">
              <p>Listeners: {artist.stats.listeners}</p>
              <p>Playcount: {artist.stats.playcount}</p>
            </div>
          </div>
          <div className="artist-img">
            {/* <img src={album[0].image[3]["#text"]} alt="" /> */}
          </div>
        </div>
        <div className="artist-nav"></div>
        <NavLink
          to={`/artist/${artist.name}/bio`}
          activeClassName="active"
          className="text-link"
        >
          BIO
        </NavLink>
        <NavLink
          to={`/artist/${artist.name}/toptracks`}
          activeClassName="active"
          className="text-link"
        >
          TOP_TRACKS
        </NavLink>
        <Switch>
          <Route path="/artist/:id/bio" component={ArtistBioComponent} />
          <Route
            path="/artist/:id/toptracks"
            component={ArtistTopTrackComponent}
          />
        </Switch>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  // console.log(ownProps);
  // console.log("STATE: ", state, state.trackReducer.test);
  // console.log("OWN: ", ownProps.match.params.id);
  return {
    artistInfo: state.trackReducer.artistInfo,
    topAlbums: state.trackReducer.topAlbums
  };
};

const dispatch = {
  getArtistInfo: getArtistInfo,
  getTopAlbums: getTopAlbums
};

export default connect(mapState, dispatch)(ArtistNameComponent);
