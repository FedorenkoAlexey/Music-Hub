import axios from "axios";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";
const Chart_Top_Track = "chart.gettoptracks";
const CHART_TEG = "tag.gettoptracks&tag=";
const JSON = "&format=json";

export default class apiService {
  getTopChartTracks = HITS => {
    const resChart = axios.get(
      `${BASE_URL}${Chart_Top_Track}${API_KEY}${JSON}&limit=${HITS}&page=1`
    );

    if (!resChart) {
      throw new Error("Error Chart request");
    }
    return resChart;
  };

  getTagChartTracks = (tag, HITS) => {
    const resTag = axios.get(
      `${BASE_URL}${CHART_TEG}${tag}${API_KEY}${JSON}&limit=${HITS}&page=1`
    );
    if (!resTag) {
      throw new Error("Error Chart Tag request");
    }
    return resTag;
  };
}

// tag.gettoptracks&tag=disco&api_key=32084b8c1570367216c6f6bf233d6455&format=json
