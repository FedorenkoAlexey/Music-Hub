export const SET_GOOGLE_NAME = "GOOGLE_AUTH_IN";
export const IS_GOOGLE_AUTH = "IS_GOOGLE_AUTH";

export const getGoogleName = name => ({
  type: SET_GOOGLE_NAME,
  payload: name
});

export const isGoogleAuth = data => ({
  type: IS_GOOGLE_AUTH,
  payload: data
});
