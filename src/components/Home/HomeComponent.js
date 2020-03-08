import React, { Component } from "react";
import googleService from "../../services/googleService";
import { connect } from "react-redux";

import { getGoogleName } from "../../store/actions/googleAuth";

class HomeComponent extends Component {
  apiGoogle = new googleService();
  componentDidMount() {
    this.apiGoogle.googleInit();
  }

  onSignIn = () => {
    this.apiGoogle.signIn().then(res => {
      this.props.getGoogleName(res.getName());
      // console.log("RES", res.Ad, "TOKEN", res.dV, res.getName());
      // console.log(this.props);
    });
  };

  render() {
    return (
      <div>
        Home Component
        <div>
          <button onClick={this.onSignIn}>Sing In</button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  console.log(state.googleReducer.googleName);
  return {
    googleName: state.googleReducer.googleName
  };
};

const dispatch = {
  getGoogleName: getGoogleName
};

export default connect(mapState, dispatch)(HomeComponent);
