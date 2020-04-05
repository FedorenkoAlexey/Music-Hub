import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollPanel } from "primereact/scrollpanel";
import { ProgressSpinner } from "primereact/progressspinner";
import artistService from "../../services/artistService";
import { getArtistInfo } from "../../store/actions/getTracks";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./biostyles.css";

class ArtistBioComponent extends Component {
  api = new artistService();
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      err: "spinner"
    };
  }

  componentDidMount() {
    const artistName = this.props.match.params.id || "";

    this.api
      .getArtist(artistName)
      .then(res => {
        this.props.getArtistInfo(res.data);
        let bio = this.props.artistInfo.artist.bio.content;
        // console.log(res.data.artist.stats);
        return bio;
      })
      .then(bio => {
        let index = bio.indexOf("<a");
        let answ = bio.slice(0, index);

        setTimeout(() => {
          this.setState({
            bio: answ,
            err: "err"
          });
        }, 300);
      });
  }
  render() {
    // const { artist } = this.props.artistInfo;
    const { bio } = this.state;
    return (
      <div className="bio-wrap">
        {bio ? (
          <ScrollPanel className="custom" style={{ fontSize: "20px" }}>
            <p>{bio}</p>
          </ScrollPanel>
        ) : this.state.err === "spinner" ? (
          <ProgressSpinner
            className="spinner"
            strokeWidth="7"
            fill="#7e95c0"
            animationDuration=".5s"
          />
        ) : (
          <p className="err">No biography of this artist found</p>
        )}

        {/* <div className="art-info">{bio ? <p>{bio}</p> : <p></p>}</div> */}
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
