import { GET_CHART_TRACKS } from "../actions/getTracks";
import { GET_ARTIST_INFO } from "../actions/getTracks";
import { GET_TOP_ALBUMS } from "../actions/getTracks";

const initState = {
  chartTracks: {
    tracks: {
      track: []
    }
  },
  artistInfo: {
    artist: {
      bio: [],
      stats: []
    }
  },
  topAlbums: {
    album: [
      {
        image: [
          {
            text: []
          }
        ]
      }
    ]
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
    case GET_TOP_ALBUMS:
      return {
        ...state,
        topAlbums: action.payload
      };
  }
  return state;
};