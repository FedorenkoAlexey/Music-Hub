import React, { Component } from "react";
import { connect } from "react-redux";
import { Paginator } from "primereact/paginator";
// import { getArtistInfo } from "../../store/actions/getTracks";

import artistService from "../../services/artistService";
import { getArtistInfo, getTopTracks } from "../../store/actions/getTracks";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles.css";

class ArtistTopTrackComponent extends Component {
  api = new artistService();
  constructor() {
    super();
    this.state = {
      artistName: "",
      hitsPerPage: 10,
      currentPage: 1,
      totalPage: null,
      arrPages: [],
    };
  }
  componentDidMount() {
    const artistName = this.props.match.params.id || "";
    this.setState({
      artistName: artistName,
    });
    const { hitsPerPage, currentPage } = this.state;
    this.getTracks(artistName, hitsPerPage, currentPage);
  }

  onPageChange(event) {
    this.setState(
      {
        first: event.first,
        hitsPerPage: event.rows,
        currentPage: event.page + 1,
      },
      () => {
        this.getTracks(
          this.state.artistName,
          this.state.hitsPerPage,
          this.state.currentPage
        );
      }
    );
  }

  getTracks = (artist, hits, page) => {
    this.api
      .getTopTracks(artist, this.state.hitsPerPage, this.state.currentPage)
      .then((res) => {
        console.log("TOP-TRACKS-res-data:", res.data);
        this.props.getTopTracks(res.data.toptracks);
        this.setState({
          totalPage: +res.data.toptracks["@attr"].totalPages,
        });
      });
  };

  render() {
    const { track } = this.props.topTracks;
    const { first, hitsPerPage, totalPage } = this.state;
    return (
      <div className="toptrack-wrap">
        <div className="paginator">
          <Paginator
            first={first}
            rows={hitsPerPage}
            totalRecords={totalPage}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={(e) => this.onPageChange(e)}
            // onPageChange={e => this.setState({ first: e.first, hits: e.rows })}
          ></Paginator>
        </div>
        <ul className="top-track">
          {track.map((track) => (
            <li className="track-item" key={track.name + track.listeners}>
              <div className="track-block">
                <div className="track-name">{track.name} </div>
                <div className="track-listen">playcount: {track.playcount}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    artistInfo: state.trackReducer.artistInfo,
    topTracks: state.trackReducer.topTracks,
  };
};
const dispatch = {
  getArtistInfo: getArtistInfo,
  getTopTracks: getTopTracks,
};

export default connect(mapState, dispatch)(ArtistTopTrackComponent);
