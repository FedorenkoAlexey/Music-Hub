import { combineReducers } from "redux";
import { trackReducer } from "./reducers/chartTracks";
import { googleReducer } from "./reducers/googleAuth"

export default combineReducers({
  trackReducer: trackReducer,
  googleReducer: googleReducer
});
