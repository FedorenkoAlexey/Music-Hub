import React, { Component } from "react";
import { connect } from "react-redux";
import "./trackstyles.css";

import artistService from "../../services/artistService";
import { getArtistInfo, getAlbumInfo } from "../../store/actions/getTracks";

class TrackOfAlbumsComponent extends Component {
  api = new artistService();
  constructor(props) {
    super(props);
    this.state = {
      image: ""
    };
  }

  componentDidMount() {
    const albumName = this.props.match.params.id || "";
    const artistName = this.props.location.state.artistName;
    console.log("Props: ", this.props);
    // console.log("PROPS_TRACK_ALBUMS: ", this.props.albumInfo.album);

    this.api.getAlbumTrack(artistName, albumName).then(res => {
      this.props.getAlbumInfo(res.data);
      this.setState({
        image: this.props.albumInfo.album.image[3]["#text"]
      });
      console.log("RESULT_TRACK_ALBUMS: ", res.data);
    });
  }

  render() {
    const { album } = this.props.albumInfo;
    const { track } = this.props.albumInfo.album.tracks;
    return (
      <div className="album-wrap">
        <div className="album-head">
          <div className="album-cover">
            <img src={this.state.image} alt={"album-img"} />
          </div>
          <div className="album-info">
            <h1 className="name">{album.name}</h1>
            {album.wiki ? (
              <p className="release">Release Date: {album.wiki.published}</p>
            ) : (
              <p></p>
            )}

            <p>Listenets: {album.listeners}</p>
            <p className="play">Playcount: {album.playcount}</p>
          </div>
        </div>
        <ul className="album-track">
          {track.map(track => (
            <li className="track-item" key={track.name}>
              <div className="track-block">
                <div className="track-name">{track.name} </div>
                <div className="track-listen">Duration: {track.duration}</div>
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
    albumInfo: state.trackReducer.albumInfo
  };
};
const dispatch = {
  getArtistInfo: getArtistInfo,
  getAlbumInfo: getAlbumInfo
};

export default connect(mapState, dispatch)(TrackOfAlbumsComponent);
