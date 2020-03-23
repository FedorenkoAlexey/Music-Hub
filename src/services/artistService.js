import axios from "axios";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const ARTIST_INFO = "artist.getinfo&artist=";
const ARTIST_TOP_TRACK = "artist.gettoptracks&artist=";
const TOP_ALBUMS = "artist.gettopalbums&artist=";
const ALBUM_INFO = "album.getinfo&album=";
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

  getTopTracks = (artist, hits, page) => {
    console.log("getTopTracks", artist, hits, page);
    const resTrack = axios.get(
      `${BASE_URL}${ARTIST_TOP_TRACK}${artist}${API_KEY}${JSON}&limit=${hits}&page=${page}`
    );
    if (!resTrack) {
      throw new Error("Error Artist Info request");
    }
    return resTrack;
  };

  getAlbumTrack = (artist, album) => {
    const resAlbumTrack = axios.get(
      `${BASE_URL}${ALBUM_INFO}${album}&artist=${artist}${API_KEY}${JSON}`
    );
    if (!resAlbumTrack) {
      throw new Error("Error Tracks of Albums request");
    }
    return resAlbumTrack;
  };
}
