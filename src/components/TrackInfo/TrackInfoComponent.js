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
        album: {
          artist: {
            name: "",
          },
        },
        media: [],
      },
    };
  }

  componentDidMount() {
    const trackID = this.props.match.params.id || "";
    this.api.trackInfo(trackID).then((res) => {
      console.log("TR_COMP", res.data.response);
      this.setState(
        {
          song: res.data.response.song,
        },
        () => {
          console.log(this.state);
        }
      );
    });
  }

  render() {
    const image_url = this.state.song.header_image_url;
    const { song } = this.state;
    return (
      <div className="track-container">
        {image_url ? (
          <div className="track-info-wrap">
            <div
              className="track-img"
              style={{
                backgroundImage: `url(${image_url})`,
              }}
            ></div>
            <div className="track-info">
              {song.album ? (
                <div className="artist-name">{song.album.artist.name}</div>
              ) : (
                <p></p>
              )}

              <div className="track-name">{song.title}</div>

              <div className="release">{song.release_date_for_display}</div>
              <a className="apple-music" href={song.apple_music_player_url}></a>
            </div>
          </div>
        ) : (
          <div className="spinner-cont">
            <ProgressSpinner
              className="spinner"
              strokeWidth="7"
              // fill="#7e95c0"
              animationDuration=".5s"
            />
          </div>
        )}

        {song.media.map((media) => (
          <div className="media" key={media.url}>
            <a href={media.url}>
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
    hitsSearch: state.searchReducer.hitsSearch,
  };
};

const dispatch = {};

export default connect(mapState, dispatch)(TrackInfoComponent);
