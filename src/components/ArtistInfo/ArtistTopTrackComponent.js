import React, { Component } from "react";
import { connect } from "react-redux";
// import { getArtistInfo } from "../../store/actions/getTracks";

import artistService from "../../services/artistService";
import { getArtistInfo, getTopTracks } from "../../store/actions/getTracks";

class ArtistTopTrackComponent extends Component {
  api = new artistService();
  componentDidMount() {
    const artistName = this.props.match.params.id || "";

    this.api.getTopTracks(artistName).then(res => {
      console.log("TOP-TRACKS-res-data:", res.data);
      this.props.getTopTracks(res.data.toptracks);
      console.log("TOP-TRACS-Props", this.props.topTracks.track);
    });
  }

  render() {
    const { track } = this.props.topTracks;
    return (
      <div>
        Artist Top Track Component
        {/* <p>>{track[0].name}</p> */}
        {/* <p>>{this.props.topTracks.track[0].name}</p> */}
        <ul>
          {track.map(track => (
            <li key={track.listeners}>
              {track.name}
              <span> playcount - {track.playcount}</span>
              {/* <span
                key={track.listeners*2}
                onClick={() => this.getArtInfo(track.name)}
              >
                <b>
                  <NavLink
                    activeClassName="active"
                    to={`/artist/${track.artist.name}`}
                  >
                    {track.artist.name}
                  </NavLink>
                </b>
              </span> */}
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
    topTracks: state.trackReducer.topTracks
  };
};
const dispatch = {
  getArtistInfo: getArtistInfo,
  getTopTracks: getTopTracks
};

export default connect(mapState, dispatch)(ArtistTopTrackComponent);
