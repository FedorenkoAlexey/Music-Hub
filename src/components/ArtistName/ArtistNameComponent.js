import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";

import ArtistBioComponent from "../ArtistInfo/ArtistBioComponent";
import ArtistTopTrackComponent from "../ArtistInfo/ArtistTopTrackComponent";
import ArtistAlbumsComponent from "../ArtistInfo/ArtistAlbumsComponent";
import artistService from "../../services/artistService";

import { getArtistInfo, getTopAlbums } from "../../store/actions/getTracks";
import "./styles.css";

class ArtistNameComponent extends Component {
  api = new artistService();
  constructor(props) {
    super(props);
    this.state = {
      image: ""
    };
  }

  componentDidMount() {
    const artistName = this.props.match.params.id || "";
    // console.log("artistName", artistName);
    // console.log("this.props.artistInfo", this.props.artistInfo);
    this.api.getArtist(artistName).then(res => {
      this.props.getArtistInfo(res.data);
    });

    this.api.getTopAlbums(artistName).then(result => {
      this.props.getTopAlbums(result.data.topalbums);
      this.setState({
        image: this.props.topAlbums.album[0].image[3]["#text"]
      });
    });
  }

  render() {
    const { artist } = this.props.artistInfo;
    // const { album } = this.props.topAlbums;
    return (
      <div className="artist-container">
        <div className="artist-header">
          <div className="artist-info">
            <div className="artist-name">{artist.name}</div>
            <div className="artist-listen">
              <p>Listeners: {artist.stats.listeners}</p>
              <p>Playcount: {artist.stats.playcount}</p>
            </div>
          </div>
          <div className="artist-img">
            <img src={this.state.image} alt={artist.name} />
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

        <NavLink
          to={`/artist/${artist.name}/albums`}
          activeClassName="active"
          className="text-link"
        >
          ALBUMS
        </NavLink>
        <Switch>
          <Route path="/artist/:id/bio" component={ArtistBioComponent} />
          <Route
            path="/artist/:id/toptracks"
            component={ArtistTopTrackComponent}
          />
          <Route path="/artist/:id/albums" component={ArtistAlbumsComponent} />
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
