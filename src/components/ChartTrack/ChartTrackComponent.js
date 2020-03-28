import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import apiService from "../../services/apiService";
import artistService from "../../services/artistService";
import ChartTagComponent from "../ChartTag/ChartTagComponent";
import { getChartTracks, getArtistInfo } from "../../store/actions/getTracks";

import rock from "../../assets/images/rock.png";
import hiphop from "../../assets/images/hip-hop.png";
import jazz from "../../assets/images/jazz.png";
import reggae from "../../assets/images/reggae.png";
import dance from "../../assets/images/dance.png";
import metal from "../../assets/images/metal.png";
import blues from "../../assets/images/blues.png";
import classical from "../../assets/images/classical.png";
import old from "../../assets/images/80s.png";
import rap from "../../assets/images/rap.png";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles.css";
import "./media.css";

class ChartTrackComponent extends Component {
  apiService = new apiService();
  artistService = new artistService();
  constructor(props) {
    super(props);
    this.state = {
      hitsPerPage: 15,
      totalPage: null,
      // arrPages: [1, 2, 3, 4, 5],
      arrPages: [],
      currentPage: 1,
      tag: "rock"
    };
  }

  componentDidMount() {
    const { tag, hitsPerPage, currentPage } = this.state;
    this.getTagChart(tag, hitsPerPage, currentPage);
  }

  getArtInfo = artistName => {
    this.artistService.getArtist(artistName).then(res => {
      this.props.getArtistInfo(res.data);
    });
  };

  getTagChart = (tag, hits, page) => {
    this.apiService
      .getTagChartTracks(tag, this.state.hitsPerPage, this.state.currentPage)
      .then(res => {
        this.props.getChartTracks(res.data);
        // console.log("RES", res.data);
        console.log("PAGES", res.data.tracks["@attr"].totalPages);

        let pages = [];

        res.data.tracks["@attr"].totalPages > 20
          ? this.setState({
              totalPage: 20
            })
          : this.setState({
              totalPage: res.data.tracks["@attr"].totalPages
            });

        for (let i = 1; i <= this.state.totalPage; i++) {
          pages.push(i);
        }

        this.setState({
          arrPages: pages
        });

        // console.log("this.state.tag ", this.state.tag, "tag", tag);
        this.state.tag === tag
          ? console.log("Tag without changes")
          : this.setState({
              currentPage: 1,
              tag: tag
            });
      });
  };

  onHitsChange = e => {
    const hits = e.target.value;
    this.setState(
      {
        hitsPerPage: hits
      },
      () => {
        console.log(this.state.tag, hits, this.state.currentPage);
        this.getTagChart(this.state.tag, hits, this.state.currentPage);
      }
    );
  };

  paginate = number => {
    this.setState(
      {
        currentPage: number
      },
      () => {
        this.getTagChart(this.state.tag, this.state.hitsPerPage, number);
      }
    );
    console.log("NUM", this.state.currentPage);
    // this.getChart();
  };

  render() {
    const { track } = this.props.chartTracks.tracks;
    const HITS = [{ value: 10 }, { value: 15 }, { value: 20 }];
    const { artist } = this.props.artistInfo;
    return (
      <div className="chart-container">
        <div className="nav-chart">
          <div
            className={this.state.tag === "rock" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("rock")}
          >
            <img src={rock} alt={"rock"} />
          </div>
          <div
            className={this.state.tag === "hip-hop" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("hip-hop")}
          >
            <img src={hiphop} alt={"hip-hop"} />
          </div>
          <div
            className={this.state.tag === "jazz" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("jazz")}
          >
            <img src={jazz} alt={"jazz"} />
          </div>
          <div
            className={this.state.tag === "reggae" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("reggae")}
          >
            <img src={reggae} alt={"reggae"} />
          </div>
          <div
            className={this.state.tag === "dance" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("dance")}
          >
            <img src={dance} alt={"dance"} />
          </div>
          <div
            className={this.state.tag === "metal" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("metal")}
          >
            <img src={metal} alt={"metal"} />
          </div>
          <div
            className={this.state.tag === "blues" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("blues")}
          >
            <img src={blues} alt={"blues"} />
          </div>
          <div
            className={this.state.tag === "classical" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("classical")}
          >
            <img src={classical} alt={"classical"} />
          </div>
          <div
            className={this.state.tag === "80s" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("80s")}
          >
            <img src={old} alt={"80s"} />
          </div>
          <div
            className={this.state.tag === "rap" ? "active" : "div-tag"}
            onClick={() => this.getTagChart("rap")}
          >
            <img src={rap} alt={"rap"} />
          </div>
        </div>
        <div className="hits">
          Hits per page:
          <Dropdown
            value={this.state.hitsPerPage}
            options={HITS}
            onChange={this.onHitsChange}
            placeholder="Hits per page"
            optionLabel="value"
            className="dropdown"
          />
        </div>
        <Switch>
          <Route exact path="/chart/:id" component={ChartTagComponent} />
        </Switch>
        <ul className="chart-tracks">
          {track.map(track => (
            <li className="track-item" key={track.name + track.duration}>
              <div className="track-block">
                <div className="track-name">{track.name} </div>

                <NavLink
                  className="track-artist"
                  activeClassName="active"
                  to={`/artist/${track.artist.name}/bio`}
                >
                  {track.artist.name}
                </NavLink>

                <div className="track-duration">duration: {track.duration}</div>

                {/* <span onClick={() => this.getArtInfo(track.artist.name)}>
                  <b>
                    <NavLink
                      activeClassName="active"
                      to={`/artist/${track.artist.name}`}
                    >
                      {track.artist.name}
                    </NavLink>
                  </b>
                </span> */}
              </div>
            </li>
          ))}
        </ul>
        <ul className="number-pages">
          {this.state.arrPages.map(page => (
            <li className="li-number" key={page}>
              <a
                className={this.state.currentPage == page ? "active" : "number"}
                onClick={() => this.paginate(page)}
              >
                {page}
              </a>
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
