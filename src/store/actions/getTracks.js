export const GET_CHART_TRACKS = "GET_CHART_TRACKS";
export const GET_ARTIST_INFO = "GET_ARTIST_INFO";

export const getChartTracks = tracks => ({
  type: GET_CHART_TRACKS,
  payload: tracks
});

export const getArtistInfo = artists => ({
  type: GET_ARTIST_INFO,
  payload: artists
});
