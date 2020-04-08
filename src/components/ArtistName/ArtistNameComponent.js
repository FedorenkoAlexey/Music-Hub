import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";

import ArtistBioComponent from "../ArtistInfo/ArtistBioComponent";
import ArtistTopTrackComponent from "../ArtistTopTrack/ArtistTopTrackComponent";
import ArtistAlbumsComponent from "../ArtistInfo/ArtistAlbumsComponent";
import TrackOfAlbumsComponent from "../TrackOfAlbums/TrackOfAlbumsComponent";
import artistService from "../../services/artistService";

import { getArtistInfo, getTopAlbums } from "../../store/actions/getTracks";
import "./styles.css";
import "./fonts.css";
import "./media.css";

class ArtistNameComponent extends Component {
  api = new artistService();
  constructor(props) {
    super(props);
    this.state = {
      image: "",
    };
  }

  componentDidMount() {
    const artistName = this.props.match.params.id || "";
    this.newArtist(artistName);
  }

  newArtist = (artist) => {
    this.api.getArtist(artist).then((res) => {
      this.props.getArtistInfo(res.data);
      console.log("artist-info", res.data);
    });

    this.api.getTopAlbums(artist).then((result) => {
      this.props.getTopAlbums(result.data.topalbums);
      const apiImage = this.props.topAlbums.album[0].image[3]["#text"];
      apiImage
        ? this.setState({
            image: apiImage,
          })
        : console.log("No artist image");
    });
  };

  render() {
    const { artist } = this.props.artistInfo;
    const similar = artist.similar.artist;
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
              url(${this.state.image} )`,
            }}
          >
            {/* <img src={this.state.image} alt={artist.name} /> */}
          </div>
        </div>
        <p className="text-similar">Similar artists:</p>
        <div className="art-div">
          {similar.map((artist) => (
            <div key={artist.url} className="similar">
              <NavLink
                onClick={() => {
                  this.newArtist(artist.name);
                }}
                className="track-artist"
                activeClassName="active"
                to={`/artist/${artist.name}`}
              >
                {artist.name}
              </NavLink>
            </div>
          ))}
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
    topAlbums: state.trackReducer.topAlbums,
  };
};

const dispatch = {
  getArtistInfo: getArtistInfo,
  getTopAlbums: getTopAlbums,
};

export default connect(mapState, dispatch)(ArtistNameComponent);
