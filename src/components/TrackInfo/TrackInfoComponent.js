import React, { Component } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";

import musicService from "../../services/musicService";
import { getSearchTracks } from "../../store/actions/search";
import "./styles.css";

class TrackInfoComponent extends Component {
  api = new musicService();
  constructor(props) {
    super(props);
    this.state = {
      song: {
        media: [
          // {
          //   url: "",
          //   provider: ""
          // },
          // {
          //   url: "",
          //   provider: ""
          // },
          // {
          //   url: "",
          //   provider: ""
          // }
        ]
      }
    };
  }

  componentDidMount() {
    const trackID = this.props.match.params.id || "";
    this.api.trackInfo(trackID).then(res => {
      console.log("TR_COMP", res.data.response);
      this.setState(
        {
          song: res.data.response.song
        },
        () => {
          console.log(this.state);
        }
      );
    });
  }

  render() {
    const image_url = this.state.song.header_image_url;
    return (
      <div className="track-container">
        Track Info
        <div
          className="track-img"
          style={{
            backgroundImage: `url(${image_url})`
          }}
        ></div>
        {image_url ? (
          <a href={this.state.song.apple_music_player_url}>
            <div className="apple-music"></div>
          </a>
        ) : (
          <ProgressSpinner
            className="spinner"
            strokeWidth="7"
            // fill="#7e95c0"
            animationDuration=".5s"
          />
        )}
        {/* <a href={this.state.song.media[0].url}> YouTube </a> */}
        {this.state.song.media.map(media => (
          <div className="media" key={media.url}>
            <a href={media.url}>
              {/* <div className={media.provider}></div> */}
              {media.provider === "youtube" ? (
                <ReactPlayer url={media.url} />
              ) : (
                <p></p>
              )}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    hitsSearch: state.searchReducer.hitsSearch
  };
};

const dispatch = {};

export default connect(mapState, dispatch)(TrackInfoComponent);
