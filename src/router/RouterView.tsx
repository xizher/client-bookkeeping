import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import {
  ViewLogin,
  ViewMain,
} from '../views'

interface IRoute {
  path: string
  component (): JSX.Element
}

const routes : IRoute[] = [
  { path: '/login', component: ViewLogin },
  { path: '/', component: ViewMain }, // '/' need use in the end index
]

function RouterView () : JSX.Element {
  return (
    <Router>
      <Switch>
        { routes.map((route, index) => (
          <Route
            key={ index }
            path={ route.path }
            component={ route.component }
          >
          </Route>
        )) }
      </Switch>
    </Router>
  )
}

export default RouterView
