import React, { PureComponent } from "react";
// import { connect } from "react-redux";
import {
  BrowserRouter,
  Route,
  Switch
  // , Redirect
} from "react-router-dom";

import HeaderComponent from "../components/Header/HeaderComponent";
import HomeComponent from "../components/Home/HomeComponent";
import ArtistComponent from "../components/Artists/ArtistsComponent";

class Routes extends PureComponent {
  render() {
    return (
      <div className="app-routes">
        <BrowserRouter>
          <HeaderComponent />
          <Switch>
            <Route exact path="/home" component={HomeComponent} />
            <Route path="/artists" component={ArtistComponent} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

// Routes.defaultProps = {};

export default Routes;
