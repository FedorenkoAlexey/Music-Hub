import React from "react";
import { connect } from "react-redux";

const ArtistName = ({ artistInfo }) => (
  <div>
    ArtistNameComponent
    <p>
      {" "}
      {artistInfo.artist.name}
      {/* {track.name} */}
    </p>
  </div>
);

const mapState = (state, ownProps) => {
  console.log(ownProps);
  console.log("STATE: ", state, state.trackReducer.test);
  console.log("OWN: ", ownProps.match.params.id);

  return {
    artistInfo: state.trackReducer.artistInfo
      ? // state.trackReducer.test.id === Number(ownProps.match.params.id)
        (state.trackReducer.artistInfo,
        console.log("Yes: ", state.trackReducer.artistInfo.artist))
      : console.log("NO")
  };
};

export default connect(mapState)(ArtistName);
