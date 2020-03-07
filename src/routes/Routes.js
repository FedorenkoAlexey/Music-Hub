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
import ChartTrackComponent from "../components/ChartTrack/ChartTrackComponent";
import ArtistNameComponent from "../components/ArtistName/ArtistNameComponent";

class Routes extends PureComponent {
  render() {
    return (
      <div className="app-routes">
        <BrowserRouter>
          <HeaderComponent />
          <Switch>
            <Route exact path="/home" component={HomeComponent} />
            <Route exact path="/chart" component={ChartTrackComponent} />
            <Route path="/artist/:id" component={ArtistNameComponent} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

// Routes.defaultProps = {};

export default Routes;
