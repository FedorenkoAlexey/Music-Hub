import axios from "axios";

let SEARCH = `https://api.genius.com/search?`;
let URL = `https://api.genius.com/songs/317204`;
let token = `access_token=_z00R94_JfoxqnD2_lPlfAUMBJ__CAsdsGOjk0O10Tqc719nRPjof48i10fit7Xg`;

export default class musicService {
  onSearch = params => {
    const result = axios.get(`${SEARCH}${token}&q=${params}`);
    if (!result) {
      throw new Error("Error Search Albums request");
    }
    return result;
  };
}
