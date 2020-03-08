import React, { Component } from "react";
// import axios from "axios";
import { connect } from "react-redux";

class HomeComponent extends Component {
  componentDidMount() {
    window.gapi.load("auth2", function() {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
        })
        .then(
          () => console.log("Inin OK"),
          () => console.log("Init ERR")
        );
    });
  }

  onSignIn = () => {
    const isAuthOk = googleUser => {
      console.log("googleUser:", googleUser.getBasicProfile().getName());
    };

    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signIn({ scope: "profile email" }).then(isAuthOk, () =>
      console.log("Auth ERR")
    );
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
  return {};
};

const dispatch = {};

export default connect(mapState, dispatch)(HomeComponent);
