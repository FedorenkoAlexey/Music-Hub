import {
  GET_SEARCH_TRACKS,
  GET_SEARCH_VALUE_ALL,
  GET_SEARCH_ALBUMS,
  GET_SEARCH_ARTIST,
  GET_SEARCH_MUSIC
} from "../actions/search";

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
  },
  // hitsSearch: []
  hitsSearch: {
    hits: [
      {
        result: {
          title: [],
          id: [],
          primary_artist: {
            name: [],
            id: []
          }
        }
      }
    ]
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
    case GET_SEARCH_MUSIC:
      return {
        ...state,
        hitsSearch: action.payload
      };
  }
  return state;
};
