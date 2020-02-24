import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// import { NavLink } from "react-router-dom";

import { getChartTracks, getArtistInfo } from "../../store/actions/getTracks";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const Chart_Top_Track = "chart.gettoptracks";
const ARTIST_INFO = "artist.getinfo&artist=";
const JSON = "&format=json";

class ArtistComponent extends Component {
  componentDidMount() {
    // const { chartTracks } = this.props;
    axios.get(`${BASE_URL}${Chart_Top_Track}${API_KEY}${JSON}`).then(res => {
      this.props.getChartTracks(res.data);
    });
  }

  getInfo = () => {
    console.log("topTracks: ", this.props.chartTracks.tracks.track[1]);
    console.log("Art-Info: ", this.props.artistInfo.artist.bio.content);
  };

  getArtInfo = artistName => {
    axios
      .get(`${BASE_URL}${ARTIST_INFO}${artistName}${API_KEY}${JSON}`)
      .then(res => {
        this.props.getArtistInfo(res.data);
      });
  };

  render() {
    const { track } = this.props.chartTracks.tracks;
    const { artist } = this.props.artistInfo;
    return (
      <div className="artists-comp">
        Attists Component
        <br></br>
        <button onClick={this.getInfo}>get Info</button>
        <ul>
          {track.map(track => (
            <li key={track.listeners}>
              {track.name} -{" "}
              <span
                key={track.listeners + 2}
                onClick={() => this.getArtInfo(track.artist.name)}
              >
                <b>{track.artist.name}</b>
              </span>
            </li>
          ))}
        </ul>
        <div className="art-info">
          {artist ? <p>{artist.bio.content}</p> : <p>NO</p>}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    chartTracks: state.trackReducer.chartTracks,
    artistInfo: state.trackReducer.artistInfo
  };
};

const dispatch = {
  getChartTracks: getChartTracks,
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(ArtistComponent);
