import axios from "axios";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const ARTIST_INFO = "artist.getinfo&artist=";
const ARTIST_TOP_TRACK = "artist.gettoptracks&artist=";
const TOP_ALBUMS = "artist.gettopalbums&artist=";
const JSON = "&format=json";

export default class artistService {
  getTopAlbums = artist => {
    const resTag = axios.get(
      `${BASE_URL}${TOP_ALBUMS}${artist}${API_KEY}${JSON}&limit=20`
    );
    if (!resTag) {
      throw new Error("Error Chart Tag request");
    }
    return resTag;
  };

  getArtist = artist => {
    const resArt = axios.get(
      `${BASE_URL}${ARTIST_INFO}${artist}${API_KEY}${JSON}`
    );
    if (!resArt) {
      throw new Error("Error Artist Info request");
    }
    return resArt;
  };

  getTopTracks = artist => {
    const resTrack = axios.get(
      `${BASE_URL}${ARTIST_TOP_TRACK}${artist}${API_KEY}${JSON}`
    );
    if (!resTrack) {
      throw new Error("Error Artist Info request");
    }
    return resTrack;
  };
}
