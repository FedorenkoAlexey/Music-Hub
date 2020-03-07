import axios from "axios";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const Chart_Top_Track = "chart.gettoptracks";
const CHART_TEG = "tag.gettoptracks&tag=";
const ARTIST_INFO = "artist.getinfo&artist=";
const TOP_ALBUMS = "artist.gettopalbums&artist=";
const JSON = "&format=json";

export default class artistService {
  getTopAlbums = artist => {
    const resTag = axios.get(
      `${BASE_URL}${TOP_ALBUMS}${artist}${API_KEY}${JSON}`
    );
    if (!resTag) {
      throw new Error("Error Chart Tag request");
    }
    return resTag;
  };

  getTopAl;
}
