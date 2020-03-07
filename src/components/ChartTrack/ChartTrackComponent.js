import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import axios from "axios";
import apiService from "../../services/apiService";
import ChartTagComponent from "../ChartTag/ChartTagComponent";
import "./styles.css";

// import ArtistBioComponent from "../ArtistBio/ArtistBioComponent";
import { getChartTracks, getArtistInfo } from "../../store/actions/getTracks";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const Chart_Top_Track = "chart.gettoptracks";
const ARTIST_INFO = "artist.getinfo&artist=";
const JSON = "&format=json";

class ChartTrackComponent extends Component {
  apiService = new apiService();

  componentDidMount() {
    this.apiService.getTopChartTracks().then(res => {
      // console.log(res);
      this.props.getChartTracks(res.data);
    });
  }

  // getInfo = () => {
  //   console.log("Art-Info: ", this.props.artistInfo.artist);
  //   console.log("PROPS: ", this.props);
  // };

  getArtInfo = artistName => {
    axios
      .get(`${BASE_URL}${ARTIST_INFO}${artistName}${API_KEY}${JSON}`)
      .then(res => {
        this.props.getArtistInfo(res.data);
      });
  };

  getTagChart = tag => {
    this.apiService.getTagChartTracks(tag).then(res => {
      // console.log("Res-Tag: ", res);
      this.props.getChartTracks(res.data);
    });
  };

  render() {
    const { track } = this.props.chartTracks.tracks;
    // const { artist } = this.props.artistInfo;
    return (
      <div className="chart-container">
        CHART TRACK Component
        <br></br>
        {/* <button onClick={this.getInfo}>get Info</button> */}
        <div className="nav-chart">
          {/* <NavLink
            to={`/chart/rock`}
            activeClassName="active"
            className="text-link"
          >
            ROCK
          </NavLink> */}
          <button onClick={() => this.getTagChart("rock")}>ROCK</button>
          <button onClick={() => this.getTagChart("pop")}>POP</button>
          <button onClick={() => this.getTagChart("metall")}>METALL</button>
          <button onClick={() => this.getTagChart("80s")}>80s</button>
          <button onClick={() => this.getTagChart("dance")}>DANCE</button>
        </div>
        <Switch>
          <Route path="/chart/:rock" component={ChartTagComponent} />
        </Switch>
        <ul>
          {track.map(track => (
            <li key={track.listeners}>
              {track.name} -{" "}
              <span
                key={track.listeners + 2}
                onClick={() => this.getArtInfo(track.artist.name)}
              >
                <b>
                  <NavLink
                    activeClassName="active"
                    to={`/artist/${track.artist.name}`}
                  >
                    {track.artist.name}
                  </NavLink>
                </b>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    chartTracks: state.trackReducer.chartTracks,
    artistInfo: state.trackReducer.artistInfo
  };
};

const dispatch = {
  getChartTracks: getChartTracks,
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(ChartTrackComponent);
