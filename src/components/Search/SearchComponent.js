import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import artistService from "../../services/artistService";
import searchService from "../../services/searchService";
import cover from "../../assets/images/noCover.png";
import "./styles.css";

import { getArtistInfo, getAlbumInfo } from "../../store/actions/getTracks";
import { setSearchValue } from "../../store/actions/getTracks";
import {
  getSearchAlbums,
  getSearchArtist,
  getSearchTracks,
} from "../../store/actions/search";

class SearchComponent extends Component {
  api = new artistService();
  apiSearch = new searchService();

  componentDidMount() {
    // console.log("search ", this.props);
    const search = this.props.match.params.id;
    console.log("search", search);
    this.onSearch(search);
  }

  artInfo = (artistName, albumName) => {
    this.api.getAlbumTrack(artistName, albumName).then((res) => {
      this.props.getAlbumInfo(res.data);
    });
  };

  onSearch = (params) => {
    if (params === "") {
      console.log("Set search params");
    } else {
      this.apiSearch.getSearchArtist(params).then((res) => {
        this.props.getSearchArtist(res.data.results.artistmatches);
        console.log("RES_SEARCH_ARTIST", res.data.results.artistmatches);
        console.log("Props_ARTIST", this.props);
      });

      this.apiSearch.getSearchAlbums(params).then((res) => {
        this.props.getSearchAlbums(res.data.results.albummatches);
        console.log("RES_SEARCH_Albums", res.data.results.albummatches);
      });

      this.apiSearch.getSearchTracks(params).then((res) => {
        this.props.getSearchTracks(res.data.results.trackmatches);
        console.log("RES_SEARCH_TRAKS", res.data.results.trackmatches);
      });

      this.props.setSearchValue("");
    }
  };

  render() {
    const { album } = this.props.searchAlbums;
    const { track } = this.props.searchTracks;
    const { artist } = this.props.searchArtists;
    const { hits } = this.props.hitsSearch;
    return (
      <div className="search-container">
        <div className="search-res-artist">Artists results</div>

        <ul className="search-artist">
          {artist.map((artist) => (
            <li className="artist-item" key={artist.url + artist.listeners}>
              {/* <div className="artist-name">{artist.name}</div> */}

              <NavLink
                className="artist-name"
                activeClassName="active"
                to={`/artist/${artist.name}/bio`}
              >
                {artist.name}
              </NavLink>

              <div className="artist-listen">listeners: {artist.listeners}</div>
            </li>
          ))}
        </ul>

        <div className="search-res-text">
          Albums results
          {/* <button onClick={() => this.click()}>!!!!!!</button> */}
        </div>
        <ul className="search-albums">
          {album.map((album) => (
            <li className="album-item" key={album.name + album.url}>
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
                <Link
                  className="album-name"
                  to={{
                    pathname: `/artist/${album.artist}/album/${album.name}`,
                    state: { artistName: album.artist },
                  }}
                >
                  {album.name}{" "}
                </Link>
              </span>
              <span>
                <NavLink
                  className="artist-name"
                  activeClassName="active"
                  to={`/artist/${album.artist}/bio`}
                >
                  {album.artist}
                </NavLink>
              </span>
            </li>
          ))}
        </ul>
        <div className="search-res-text-track">Tracks results</div>
        {/* <ol className="search-tracks">
          {track.map(track => (
            <li className="track-item" key={track.listeners + track.name}>
              <div className="track-block">
                <div className="track-name">{track.name} </div>

                <NavLink
                  className="track-artist"
                  activeClassName="active"
                  to={`/artist/${track.artist}/bio`}
                >
                  {track.artist}
                </NavLink>

                <div className="track-listen">listeners: {track.listeners}</div>
              </div>
            </li>
          ))}
        </ol> */}

        <ol className="search-tracks">
          {hits.map((hit) => (
            <li className="track-item" key={hit.result.id}>
              <div className="track-block">
                <div
                  className="track-img"
                  style={{
                    backgroundImage: `url(${hit.result.header_image_url} )`,
                  }}
                ></div>
                {/* <div className="track-name">
                  {hit.result.title} - {hit.result.id}{" "}
                </div> */}

                <NavLink
                  className="track-name"
                  activeClassName="active"
                  to={`/track/${hit.result.id}`}
                >
                  {hit.result.title}
                </NavLink>

                <NavLink
                  className="track-artist"
                  activeClassName="active"
                  to={`/artist/${hit.result.primary_artist.name}/bio`}
                >
                  {hit.result.primary_artist.name}
                </NavLink>

                <div className="track-listen">
                  Duration: {hit.result.pyongs_count}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    artistInfo: state.trackReducer.artistInfo,
    searchValue: state.trackReducer.searchValue,
    searchAlbums: state.searchReducer.searchAlbums,
    searchTracks: state.searchReducer.searchTracks,
    searchArtists: state.searchReducer.searchArtists,
    hitsSearch: state.searchReducer.hitsSearch,
  };
};

const dispatch = {
  getArtistInfo: getArtistInfo,
  getAlbumInfo: getAlbumInfo,
  setSearchValue: setSearchValue,
  getSearchAlbums: getSearchAlbums,
  getSearchArtist: getSearchArtist,
  getSearchTracks: getSearchTracks,
};

export default connect(mapState, dispatch)(SearchComponent);
