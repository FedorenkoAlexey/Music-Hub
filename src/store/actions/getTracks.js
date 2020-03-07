export const GET_CHART_TRACKS = "GET_CHART_TRACKS";
export const GET_ARTIST_INFO = "GET_ARTIST_INFO";
export const GET_TOP_ALBUMS = "GET_TOP_ALBUMS";

export const getChartTracks = tracks => ({
  type: GET_CHART_TRACKS,
  payload: tracks
});

export const getArtistInfo = artists => ({
  type: GET_ARTIST_INFO,
  payload: artists
});

export const getTopAlbums = albums => ({
  type: GET_TOP_ALBUMS,
  payload: albums
});
