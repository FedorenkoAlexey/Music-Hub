import React, { Component } from "react";
import { connect } from "react-redux";
import "./albumstyles.css";

import artistService from "../../services/artistService";
import { getArtistInfo } from "../../store/actions/getTracks";

class ArtistAlbumsComponent extends Component {
  api = new artistService();
  componentDidMount() {
    const artistName = this.props.match.params.id || "";
    console.log("Props_Art-Album", this.props);
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
              <div className="album-img">
                <img src={album.image[2]["#text"]} alt={"album-img"} />
              </div>
              <span className="album-name">{album.name}</span>
              {/* <span>
              <NavLink
                className="artist-name"
                activeClassName="active"
                to={`/artist/${album.artist}/bio`}
              >
                {album.artist}
              </NavLink>
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
    topAlbums: state.trackReducer.topAlbums
  };
};
const dispatch = {
  getArtistInfo: getArtistInfo
};

export default connect(mapState, dispatch)(ArtistAlbumsComponent);
