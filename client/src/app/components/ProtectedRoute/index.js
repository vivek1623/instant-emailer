import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ROUTE_PATH } from '../../../data/config/constants'

const ProtectedRoute = ({ component: Component, admin_id, ...rest }) => {
  const checkAuthAndRender = props => {
    if (admin_id) {
      return <Component {...props} />
    }
    return <Redirect to={{ pathname: ROUTE_PATH.LOGIN, state: { from: props.location } }} />
  }

  return <Route {...rest} render={checkAuthAndRender} />
}

const mapStateToProps = ({ admin }) => {
  return {
    admin_id: admin ? admin._id : null,
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.object,
  admin_id: PropTypes.string,
}

ProtectedRoute.defaultProps = {
  admin_id: null,
}

export default connect(mapStateToProps)(ProtectedRoute)
