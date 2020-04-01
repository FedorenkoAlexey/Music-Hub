import axios from "axios";

let SEARCH = `https://api.genius.com/search?`;
let URL = `https://api.genius.com/songs/`;
let token = `access_token=_z00R94_JfoxqnD2_lPlfAUMBJ__CAsdsGOjk0O10Tqc719nRPjof48i10fit7Xg`;
// let token: process.env.REACT_APP_GENIUS_TOKEN;

export default class musicService {
  onSearch = params => {
    const result = axios.get(`${SEARCH}${token}&q=${params}`);
    if (!result) {
      throw new Error("Error Search Genius Tracks request");
    }
    return result;
  };

  trackInfo = params => {
    const result = axios.get(`${URL}${params}?${token}`);
    if (!result) {
      throw new Error("Error Genius Tracks Info request");
    }
    return result;
  };
}
