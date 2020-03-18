import { GET_SEARCH_TRACKS } from "../actions/search";
import { GET_SEARCH_ALBUMS } from "../actions/search";
import { GET_SEARCH_ARTIST } from "../actions/search";
import { GET_SEARCH_VALUE_ALL } from "../actions/search";

const initState = {
  searchValueAll: "",
  searchAlbums: {
    album: []
  },
  searchTracks: {
    track: []
  },
  searchArtists: {
    artist: []
  }
};

export const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_SEARCH_VALUE_ALL:
      return {
        ...state,
        searchValueAll: action.payload
      };
    case GET_SEARCH_TRACKS:
      return {
        ...state,
        searchTracks: action.payload
      };
    case GET_SEARCH_ALBUMS:
      return {
        ...state,
        searchAlbums: action.payload
      };
    case GET_SEARCH_ARTIST:
      return {
        ...state,
        searchArtists: action.payload
      };
  }
  return state;
};
