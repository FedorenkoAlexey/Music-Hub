import React, { Component } from "react";
import { connect } from "react-redux";

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
    const artistName = this.props.artistInfo.artist.name;

    this.api.getAlbumTrack(artistName, albumName).then(res => {
      this.props.getAlbumInfo(res.data);
      this.setState({
        image: this.props.albumInfo.album.image[3]["#text"]
      });
      // console.log("RESULT_TRACK_ALBUMS: ", res.data);
    });
  }
  click = () => {
    console.log("PROPS:", this.props);
  };
  render() {
    const { artist } = this.props.artistInfo;
    const { album } = this.props.albumInfo;
    return (
      <div>
        TrackOfAlbumsComponent
        <button onClick={this.click}>!!!!!!!!</button>
        <div>
          <img src={this.state.image} alt={"album-img"} />
        </div>
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
