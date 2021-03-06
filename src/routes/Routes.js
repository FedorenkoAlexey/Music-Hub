import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import HeaderComponent from '../components/Header/HeaderComponent'
import HomeComponent from '../components/Home/HomeComponent'
import ChartTrackComponent from '../components/ChartTrack/ChartTrackComponent'
import ArtistNameComponent from '../components/ArtistName/ArtistNameComponent'
import SearchComponent from '../components/Search/SearchComponent'
import TrackInfoComponent from '../components/TrackInfo/TrackInfoComponent'
import PrivateRoute from './PrivateRoute'

class Routes extends PureComponent {
  componentDidMount () {
    // console.log("DID", this.props);
  }

  render () {
    return (
      <div className='app-routes'>
        <BrowserRouter>
          <HeaderComponent />
          <Switch>
            <Route exact path='/home' component={HomeComponent} />
            <PrivateRoute path='/chart' exact component={ChartTrackComponent} />
            <PrivateRoute path='/search/:id' component={SearchComponent} />
            <PrivateRoute path='/artist/:id' component={ArtistNameComponent} />
            <PrivateRoute path='/track/:id' component={TrackInfoComponent} />
            <Redirect from='/' to='/home' />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    isAuth: state.googleReducer.isAuth
  }
}

Routes.defaultProps = {}

export default connect(mapState)(Routes)
