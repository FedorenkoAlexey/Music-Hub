import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = () => {
    const token = cookie.load('token')
    if (token !== undefined) {
      return true
    } else {
      return false
    }
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} /> : <Redirect to='/home' />}
    />
  )
}

export default PrivateRoute
