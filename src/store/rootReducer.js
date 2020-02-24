import { combineReducers } from "redux";
import { trackReducer } from "./reducers/chartTracks";

export default combineReducers({
  trackReducer: trackReducer
});
