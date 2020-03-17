import { combineReducers } from "redux";
import { trackReducer } from "./reducers/chartTracks";
import { googleReducer } from "./reducers/googleAuth";
import { searchReducer } from "./reducers/search";

export default combineReducers({
  trackReducer: trackReducer,
  googleReducer: googleReducer,
  searchReducer: searchReducer
});
