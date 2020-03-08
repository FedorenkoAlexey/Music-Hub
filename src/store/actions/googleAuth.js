export const GOOGLE_AUTH_IN = "GOOGLE_AUTH_IN";

export const getGoogleName = name => ({
  type: GOOGLE_AUTH_IN,
  payload: name
});
