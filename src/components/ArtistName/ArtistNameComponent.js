import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { getArtistInfo } from "../../store/actions/getTracks";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const ARTIST_INFO = "artist.getinfo&artist=";
const JSON = "&format=json";

class ArtistNameComponent extends Component {
  componentDidMount() {
    const artistName = this.props.match.params.id || "";

    axios
      .get(`${BASE_URL}${ARTIST_INFO}${artistName}${API_KEY}${JSON}`)
      .then(res => {
        this.props.getArtistInfo(res.data);
        console.log(this.props.artistInfo);
      });
  }

  render() {
    const { artist } = this.props.artistInfo;
    return (
      <div>
        Artist Name Component
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
    artistInfo: state.trackReducer.artistInfo
  };
};

const dispatch = {
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(ArtistNameComponent);
