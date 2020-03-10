import React, { Component } from "react";
import { connect } from "react-redux";
// import { getArtistInfo } from "../../store/actions/getTracks";

import artistService from "../../services/artistService";
import { getArtistInfo } from "../../store/actions/getTracks";

class ArtistBioComponent extends Component {
  api = new artistService();
  componentDidMount() {
    const artistName = this.props.match.params.id || "";

    this.api
      .getArtist(artistName)
      .then(res => {
        this.props.getArtistInfo(res.data);
        let bio = this.props.artistInfo.artist.bio.content;
        console.log(res.data.artist.stats);
        return bio;
      })
      .then(bio => {
        let index = bio.indexOf("<a");
        let answ = bio.slice(0, index);
        // console.log(answ);
      });
  }
  render() {
    const { artist } = this.props.artistInfo;
    return (
      <div>
        Artist BIO_2 Component
        <p>{artist.name}</p>
        <div className="art-info">
          {artist ? <p>{artist.bio.content}</p> : <p>NO</p>}
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    artistInfo: state.trackReducer.artistInfo
  };
};
const dispatch = {
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(ArtistBioComponent);
