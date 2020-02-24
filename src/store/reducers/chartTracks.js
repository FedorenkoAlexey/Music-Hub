import { GET_CHART_TRACKS } from "../actions/getTracks";
import { GET_ARTIST_INFO } from "../actions/getTracks";

const initState = {
  res: [],
  test: {
    id: 1234,
    name: "Test Actor"
  },
  chartTracks: {
    tracks: {
      track: []
    }
  },
  artistInfo: {
    artists: {
      artist: []
    }
  }
};

export const trackReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CHART_TRACKS:
      return {
        ...state,
        chartTracks: action.payload
      };
    case GET_ARTIST_INFO:
      return {
        ...state,
        artistInfo: action.payload
      };
  }
  return state;
};
