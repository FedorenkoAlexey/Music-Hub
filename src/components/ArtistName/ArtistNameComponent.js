import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";

import ArtistBioComponent from "../ArtistBio/ArtistBioComponent";
import artistService from "../../services/artistService";
// import ChartTagComponent from "../ChartTag/ChartTagComponent";

import { getArtistInfo, getTopAlbums } from "../../store/actions/getTracks";
import "./styles.css";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const ARTIST_INFO = "artist.getinfo&artist=";
const JSON = "&format=json";

class ArtistNameComponent extends Component {
  api = new artistService();
  image = "";

  componentDidMount() {
    const artistName = this.props.match.params.id || "";
    // let image = "";
    // let image =
    //   "https://lastfm.freetls.fastly.net/i/u/300x300/71cc320aa75906f6e4760aaaeb96b845.png";
    axios
      .get(`${BASE_URL}${ARTIST_INFO}${artistName}${API_KEY}${JSON}`)
      .then(res => {
        this.props.getArtistInfo(res.data);
        let bio = this.props.artistInfo.artist.bio.content;
        console.log(res.data.artist.stats);
        return bio;
      })
      .then(bio => {
        let i = bio.indexOf("<a");
        let answ = bio.slice(0, i);
        // console.log(answ);
      });

    this.api.getTopAlbums(artistName).then(result => {
      this.props.getTopAlbums(result.data.topalbums);
      this.image = this.props.topAlbums.album[0].image[3]["#text"];
      // console.log("ALBUMS: ", this.props.topAlbums.album[0].image[3]["#text"]);
      console.log("ALBUMS: ", this.props.topAlbums);
    });
    // console.log(this.image);
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
          ROCK
        </NavLink>
        <Switch>
          <Route path="/artist/:id/:bio" component={ArtistBioComponent} />
          {/* <Route path="/artist/:toptracks" component={ArtistTopTracksComponent} /> */}
        </Switch>
        <p>{artist.name}</p>
        <div className="art-info">
          {artist ? <p>{artist.bio.content}</p> : <p>NO</p>}
        </div>
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
