import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HeaderComponent from "../components/Header/HeaderComponent";
import HomeComponent from "../components/Home/HomeComponent";
import ChartTrackComponent from "../components/ChartTrack/ChartTrackComponent";
import ArtistNameComponent from "../components/ArtistName/ArtistNameComponent";
import SearchComponent from "../components/Search/SearchComponent";

class Routes extends PureComponent {
  componentDidMount() {
    // console.log("DID", this.props);
  }

  render() {
    return (
      <div className="app-routes">
        <BrowserRouter>
          <HeaderComponent />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            {this.props.isAuth ? (
              <Route path="/chart" component={ChartTrackComponent} />
            ) : (
              <Redirect from="/" to="/" />
            )}
            <Route path="/artist/:id" component={ArtistNameComponent} />
            <Route path="/search" component={SearchComponent} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isAuth: state.googleReducer.isAuth
  };
};

Routes.defaultProps = {};

export default connect(mapState)(Routes);
