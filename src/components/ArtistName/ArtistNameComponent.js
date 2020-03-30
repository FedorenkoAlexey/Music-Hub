import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";

import ArtistBioComponent from "../ArtistInfo/ArtistBioComponent";
import ArtistTopTrackComponent from "../ArtistInfo/ArtistTopTrackComponent";
import ArtistAlbumsComponent from "../ArtistInfo/ArtistAlbumsComponent";
import TrackOfAlbumsComponent from "../ArtistInfo/TrackOfAlbumsComponent";
import artistService from "../../services/artistService";

import { getArtistInfo, getTopAlbums } from "../../store/actions/getTracks";
import "./styles.css";
import "./media.css";

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
    this.api.getArtist(artistName).then(res => {
      this.props.getArtistInfo(res.data);
    });
    console.log("Start ArtNameComp", artistName);

    this.api.getTopAlbums(artistName).then(result => {
      this.props.getTopAlbums(result.data.topalbums);
      const apiImage = this.props.topAlbums.album[0].image[3]["#text"];
      // const apiImage = "";
      apiImage
        ? this.setState({
            image: apiImage
          })
        : console.log("No artist image");
    });
  }

  render() {
    const { artist } = this.props.artistInfo;
    return (
      <div className="artist-container">
        <div className="artist-header">
          <div className="artist-info">
            <div className="wrap-info">
              <div className="artist-name">{artist.name}</div>
              <div className="artist-listen">
                <p>Listeners: {artist.stats.listeners}</p>
                <p>Playcount: {artist.stats.playcount}</p>
              </div>
            </div>

            <div className="artist-nav">
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
                TOP TRACKS
              </NavLink>

              <NavLink
                to={`/artist/${artist.name}/albums`}
                activeClassName="active"
                className="text-link"
              >
                ALBUMS
              </NavLink>
            </div>
          </div>
          <div
            className="artist-img"
            style={{
              backgroundImage: ` 
               linear-gradient(
                -90deg,
                rgba(65, 69, 78, 0),
                rgb(3, 50, 82) 100%
              ), 
              url(${this.state.image} )`
            }}
          >
            {/* <img src={this.state.image} alt={artist.name} /> */}
          </div>
        </div>

        <Switch>
          <Route path="/artist/:id/bio" component={ArtistBioComponent} />
          <Route
            path="/artist/:id/toptracks"
            component={ArtistTopTrackComponent}
          />
          <Route path="/artist/:id/albums" component={ArtistAlbumsComponent} />
          <Route
            path="/artist/:id/album/:id"
            component={TrackOfAlbumsComponent}
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
