import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { ROUTE_PATH } from '../data/config/constants'

import ProtectedRoute from './components/ProtectedRoute'

const Login = lazy(() => import('./modules/Login'))
const Surveys = lazy(() => import('./modules/Surveys'))
const NotFound = lazy(() => import('./components/NotFound'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<FallbackLoader />}>
        <Switch>
          <Route path={ROUTE_PATH.LOGIN} component={Login} />
          <ProtectedRoute path={ROUTE_PATH.SURVEYS} component={Surveys} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}
const FallbackLoader = () => (
  <div className="ie-fixed ie-align-full ie-flex-row ie-flex-center ie-font-md">
    Loading ...
  </div>
)

export default App;
