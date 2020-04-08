import { GET_CHART_TRACKS, GET_TOP_TRACKS, GET_ARTIST_INFO, GET_TOP_ALBUMS, SET_SEARCH_VALUE, GET_ALBUM_INFO } from '../actions/getTracks'

const initState = {
  searchValue: '',
  chartTracks: {
    tracks: {
      track: []
    }
  },
  artistInfo: {
    artist: {
      bio: [],
      stats: [],
      similar: {
        artist: []
      },
      tags: {
        tsg: []
      }
    }
  },
  topTracks: {
    track: []
  },
  topAlbums: {
    album: [
      {
        image: [
          {
            // ["#text"]: []
            text: []
          },
          {
            // ["#text"]: []
            text: []
          },
          {
            // ["#text"]: []
            text: []
          }
        ]
      }
    ]
  },
  albumInfo: {
    album: {
      image: [
        {
          // ["#text"]: []
          text: []
        },
        {
          // ["#text"]: []
          text: []
        },
        {
          // ["#text"]: []
          text: []
        }
      ],
      tracks: {
        track: []
      },
      wiki: []
    }
  }
}

export const trackReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CHART_TRACKS:
      return {
        ...state,
        chartTracks: action.payload
      }
    case GET_TOP_TRACKS:
      return {
        ...state,
        topTracks: action.payload
      }
    case GET_ARTIST_INFO:
      return {
        ...state,
        artistInfo: action.payload
      }
    case GET_TOP_ALBUMS:
      return {
        ...state,
        topAlbums: action.payload
      }
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload
      }
    case GET_ALBUM_INFO:
      return {
        ...state,
        albumInfo: action.payload
      }
  }
  return state
}
