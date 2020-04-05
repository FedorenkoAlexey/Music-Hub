import axios from "axios";

const SEARCH = `https://api.genius.com/search?`;
const URL = `https://api.genius.com/songs/`;
const TOKEN = process.env.REACT_APP_GENIUS_TOKEN;

export default class musicService {
  onSearch = params => {
    console.log("ENV", TOKEN);
    const result = axios.get(`${SEARCH}${TOKEN}&q=${params}`);
    if (!result) {
      throw new Error("Error Search Genius Tracks request");
    }
    return result;
  };

  trackInfo = params => {
    const result = axios.get(`${URL}${params}?${TOKEN}`);
    if (!result) {
      throw new Error("Error Genius Tracks Info request");
    }
    return result;
  };
}
