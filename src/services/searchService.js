import axios from "axios";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const SEARCH_ARTIST = "artist.search&artist=";
const SEARCH_ALBUM = "album.search&album=";
const SEARCH_TRACK = "track.search&track=";
const JSON = "&format=json";

export default class searchService {
  getSearchAlbums = album => {
    const result = axios.get(
      `${BASE_URL}${SEARCH_ALBUM}${album}${API_KEY}${JSON}&limit=20`
    );
    if (!result) {
      throw new Error("Error Search Albums request");
    }
    return result;
  };

  getSearchTracks = track => {
    const result = axios.get(
      `${BASE_URL}${SEARCH_TRACK}${track}${API_KEY}${JSON}&limit=10`
    );
    if (!result) {
      throw new Error("Error Search Traks request");
    }
    return result;
  };

  getSearchArtist = artist => {
    const resArt = axios.get(
      `${BASE_URL}${SEARCH_ARTIST}${artist}${API_KEY}${JSON}&limit=10`
    );
    if (!resArt) {
      throw new Error("Error Search Artist Info request");
    }
    return resArt;
  };
}
