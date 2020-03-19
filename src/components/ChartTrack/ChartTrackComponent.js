import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import apiService from "../../services/apiService";
import ChartTagComponent from "../ChartTag/ChartTagComponent";
import { getChartTracks, getArtistInfo } from "../../store/actions/getTracks";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles.css";

// const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
// const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
// const ARTIST_INFO = "artist.getinfo&artist=";
// const JSON = "&format=json";

class ChartTrackComponent extends Component {
  apiService = new apiService();
  constructor(props) {
    super(props);
    this.state = {
      hitsPerPage: 15
    };
  }

  componentDidMount() {
    this.apiService.getTopChartTracks(this.state.hitsPerPage).then(res => {
      console.log("RES_CHART", res.data);
      this.props.getChartTracks(res.data);
    });
  }

  // getArtInfo = artistName => {
  //   axios
  //     .get(`${BASE_URL}${ARTIST_INFO}${artistName}${API_KEY}${JSON}`)
  //     .then(res => {
  //       this.props.getArtistInfo(res.data);
  //     });
  // };

  getTagChart = tag => {
    this.apiService.getTagChartTracks(tag, this.state.hitsPerPage).then(res => {
      console.log("HITS_PROPS: ", this.state.hitsPerPage);
      this.props.getChartTracks(res.data);
      console.log("55555", res.data);
    });
  };

  onHitsChange = e => {
    const hits = e.target.value;
    console.log(hits);
    this.setState({
      hitsPerPage: hits
    });
    this.apiService.getTopChartTracks(hits).then(res => {
      this.props.getChartTracks(res.data);
    });
  };

  render() {
    const { track } = this.props.chartTracks.tracks;
    const HITS = [{ value: 10 }, { value: 15 }, { value: 20 }];
    // const { artist } = this.props.artistInfo;
    return (
      <div className="chart-container">
        CHART TRACK Component
        <br></br>
        {/* <button onClick={this.getInfo}>get Info</button> */}
        <div className="nav-chart">
          <NavLink
            to={`/chart/rock`}
            activeClassName="active"
            className="text-link"
          >
            ROCK
          </NavLink>
          <button onClick={() => this.getTagChart("rock")}>ROCK</button>
          <button onClick={() => this.getTagChart("pop")}>POP</button>
          <button onClick={() => this.getTagChart("metall")}>METALL</button>
          <button onClick={() => this.getTagChart("80s")}>80s</button>
          <button onClick={() => this.getTagChart("dance")}>DANCE</button>
        </div>
        <div>
          <Dropdown
            value={this.state.hitsPerPage}
            options={HITS}
            onChange={this.onHitsChange}
            placeholder="Hits per page"
            optionLabel="value"
          />
        </div>
        <Switch>
          <Route exact path="/chart/:id" component={ChartTagComponent} />
        </Switch>
        <ul>
          {track.map(track => (
            <li key={track.name + track.duration}>
              {track.name}
              <span onClick={() => this.getArtInfo(track.artist.name)}>
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
