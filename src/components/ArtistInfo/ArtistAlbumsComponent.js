import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./albumstyles.css";
import cover from "../../assets/images/noCover.png";

import artistService from "../../services/artistService";
import { getArtistInfo } from "../../store/actions/getTracks";

class ArtistAlbumsComponent extends Component {
  api = new artistService();
  componentDidMount() {
    const artistName = this.props.match.params.id || "";
    console.log("Props_Art-Album", this.props);
    // this.props.artistInfo.artist === ""
    //   ? this.artistService.getArtist(artistName).then(res => {
    //       this.props.getArtistInfo(res.data);
    //     })
    //   : console.log("2");
  }

  render() {
    const { artist } = this.props.artistInfo;
    const { album } = this.props.topAlbums;
    return (
      <div className="albums-wrapper">
        <p className="text-artist-name">{artist.name} albums:</p>
        <ul className="search-albums">
          {album.map(album => (
            <li className="album-item" key={album.name}>
              <NavLink
                className="text-link"
                to={`/artist/${artist.name}/album/${album.name}`}
              >
                <div className="album-img">
                  <img
                    src={
                      album.image[2]["#text"] === ""
                        ? cover
                        : album.image[2]["#text"]
                    }
                    alt={"album-img"}
                  />
                </div>
                <span className="album-name">
                  {album.name === "(null)" ? "" : album.name}
                </span>
              </NavLink>
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
    topAlbums: state.trackReducer.topAlbums
  };
};
const dispatch = {
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(ArtistAlbumsComponent);
