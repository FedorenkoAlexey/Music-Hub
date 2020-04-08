export const GET_SEARCH_TRACKS = 'GET_SEARCH_TRACKS'
export const GET_SEARCH_ALBUMS = 'GET_SEARCH_ALBUMS'
export const GET_SEARCH_ARTIST = 'GET_SEARCH_ARTIST'
export const GET_SEARCH_VALUE_ALL = 'GET_SEARCH_VALUE_ALL'
export const GET_SEARCH_MUSIC = 'GET_SEARCH_MUSIC'

export const getSearchTracks = tracks => ({
  type: GET_SEARCH_TRACKS,
  payload: tracks
})

export const getSearchAlbums = albums => ({
  type: GET_SEARCH_ALBUMS,
  payload: albums
})

export const getSearchArtist = artists => ({
  type: GET_SEARCH_ARTIST,
  payload: artists
})

export const getSearchValue = value => ({
  type: GET_SEARCH_VALUE_ALL,
  payload: value
})

export const getSearchMusic = data => ({
  type: GET_SEARCH_MUSIC,
  payload: data
})
